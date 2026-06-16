// Global App State
let appState = {
    updates: [],
    selectedUpdates: new Set(),
    currentFilter: 'all',
    searchQuery: '',
    currentSort: 'newest',
    isLoading: false
};

// DOM Elements
const refreshBtn = document.getElementById('refresh-btn');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const typeFilters = document.getElementById('type-filters');
const sortToggleBtn = document.getElementById('sort-toggle-btn');
const loader = document.getElementById('loader');
const noResults = document.getElementById('no-results');
const feedContainer = document.getElementById('feed-container');

// Stats Elements
const statTotal = document.getElementById('stat-total');
const statFeatures = document.getElementById('stat-features');
const statIssues = document.getElementById('stat-issues');
const statDeprecations = document.getElementById('stat-deprecations');

// Selection Bar Elements
const selectionActionBar = document.getElementById('selection-action-bar');
const selectionCount = document.getElementById('selection-count');
const actionTweet = document.getElementById('action-tweet');
const actionCopy = document.getElementById('action-copy');
const actionClear = document.getElementById('action-clear');

// Modal Elements
const tweetModal = document.getElementById('tweet-modal');
const tweetTextarea = document.getElementById('tweet-textarea');
const charCount = document.getElementById('char-count');
const tweetUrlPreview = document.getElementById('tweet-url-preview');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelTweetBtn = document.getElementById('cancel-tweet-btn');
const publishTweetBtn = document.getElementById('publish-tweet-btn');

// Toast Container
const toastContainer = document.getElementById('toast-container');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    fetchReleaseNotes(false);
    setupEventListeners();
});

// Event Listeners Setup
function setupEventListeners() {
    // Refresh button
    refreshBtn.addEventListener('click', () => {
        fetchReleaseNotes(true);
    });

    // Search input
    searchInput.addEventListener('input', (e) => {
        appState.searchQuery = e.target.value.trim().toLowerCase();
        clearSearchBtn.style.display = appState.searchQuery ? 'flex' : 'none';
        renderUpdates();
    });

    // Clear search button
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        appState.searchQuery = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        renderUpdates();
    });

    // Category filter chips
    typeFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('chip')) {
            // Update active state in UI
            document.querySelectorAll('#type-filters .chip').forEach(chip => {
                chip.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Update filter state and render
            appState.currentFilter = e.target.dataset.type;
            renderUpdates();
        }
    });

    // Sort toggle button
    sortToggleBtn.addEventListener('click', () => {
        const isNewest = appState.currentSort === 'newest';
        appState.currentSort = isNewest ? 'oldest' : 'newest';
        
        // Update UI button icon and text
        const sortText = sortToggleBtn.querySelector('span');
        const sortIcon = sortToggleBtn.querySelector('i');
        
        if (appState.currentSort === 'newest') {
            sortText.textContent = 'Newest First';
            sortToggleBtn.setAttribute('data-sort', 'newest');
            if (sortIcon) {
                sortIcon.setAttribute('data-lucide', 'arrow-down-narrow-wide');
            }
        } else {
            sortText.textContent = 'Oldest First';
            sortToggleBtn.setAttribute('data-sort', 'oldest');
            if (sortIcon) {
                sortIcon.setAttribute('data-lucide', 'arrow-up-narrow-wide');
            }
        }
        
        lucide.createIcons(); // Redraw icons
        renderUpdates();
    });

    // Floating action bar buttons
    actionClear.addEventListener('click', clearSelection);
    
    actionCopy.addEventListener('click', copySelectedUpdates);
    
    actionTweet.addEventListener('click', () => {
        openTweetModalForSelection();
    });

    // Modal buttons
    closeModalBtn.addEventListener('click', closeTweetModal);
    cancelTweetBtn.addEventListener('click', closeTweetModal);
    
    // Character limit counter for tweet editor
    tweetTextarea.addEventListener('input', (e) => {
        updateCharCount(e.target.value.length);
    });

    // Click outside modal to close
    tweetModal.addEventListener('click', (e) => {
        if (e.target === tweetModal) {
            closeTweetModal();
        }
    });
}

// Fetch Release Notes from Flask API
async function fetchReleaseNotes(forceRefresh = false) {
    if (appState.isLoading) return;
    
    setLoadingState(true);
    clearSelection();
    
    // Start spinner animation
    const refreshIcon = refreshBtn.querySelector('.icon-spinner');
    if (refreshIcon) refreshIcon.classList.add('spinning');
    
    try {
        const url = `/api/release-notes${forceRefresh ? '?force_refresh=true' : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            appState.updates = data.updates;
            renderUpdates();
            renderStats();
            
            if (forceRefresh) {
                showToast('Release notes successfully refreshed!', 'success');
            } else {
                showToast(`Loaded ${data.count} release notes.`, 'info');
            }
        } else {
            throw new Error(data.error || 'Failed to fetch release notes');
        }
    } catch (error) {
        console.error('Error fetching release notes:', error);
        showToast(`Error: ${error.message}`, 'error');
    } finally {
        setLoadingState(false);
        if (refreshIcon) refreshIcon.classList.remove('spinning');
    }
}

// Set Loading State
function setLoadingState(loading) {
    appState.isLoading = loading;
    loader.style.display = loading ? 'flex' : 'none';
    if (loading) {
        feedContainer.innerHTML = '';
        noResults.style.display = 'none';
    }
}

// Render Stats Dashboard
function renderStats() {
    const total = appState.updates.length;
    const features = appState.updates.filter(u => u.type === 'Feature').length;
    const issues = appState.updates.filter(u => u.type === 'Issue').length;
    const deprecations = appState.updates.filter(u => u.type === 'Deprecation').length;
    
    statTotal.textContent = total;
    statFeatures.textContent = features;
    statIssues.textContent = issues;
    statDeprecations.textContent = deprecations;
}

// Filter, Sort, and Render Updates list
function renderUpdates() {
    if (appState.isLoading) return;
    
    // 1. Filter updates
    let filtered = appState.updates.filter(update => {
        // Filter by category
        const matchesType = appState.currentFilter === 'all' || 
                            update.type.toLowerCase() === appState.currentFilter.toLowerCase();
        
        // Filter by search query
        const matchesSearch = !appState.searchQuery || 
                              update.date.toLowerCase().includes(appState.searchQuery) ||
                              update.type.toLowerCase().includes(appState.searchQuery) ||
                              update.description_text.toLowerCase().includes(appState.searchQuery);
                              
        return matchesType && matchesSearch;
    });
    
    // 2. Sort updates
    filtered.sort((a, b) => {
        // Safely parse timestamps, default to 0
        const dateA = a.updated ? new Date(a.updated).getTime() : 0;
        const dateB = b.updated ? new Date(b.updated).getTime() : 0;
        
        if (appState.currentSort === 'newest') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });
    
    // 3. Render
    if (filtered.length === 0) {
        feedContainer.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    feedContainer.innerHTML = filtered.map(update => {
        const isSelected = appState.selectedUpdates.has(update.id);
        const cardClass = `update-card type-${update.type.toLowerCase()} ${isSelected ? 'selected' : ''}`;
        const badgeClass = `badge badge-${update.type.toLowerCase()}`;
        
        return `
            <article class="${cardClass}" data-id="${update.id}">
                <div class="card-header">
                    <div class="card-title-group">
                        <div class="card-date">
                            <i data-lucide="calendar"></i>
                            <span>${update.date}</span>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <span class="${badgeClass}">${update.type}</span>
                        <div class="select-indicator" title="Select update to Tweet/Copy">
                            <i data-lucide="check" style="width: 12px; height: 12px;"></i>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    ${update.description_html}
                </div>
                <div class="card-actions">
                    <button class="card-btn btn-card-tweet" title="Tweet this update" data-id="${update.id}">
                        <i data-lucide="twitter" style="width: 16px; height: 16px;"></i>
                    </button>
                    <button class="card-btn btn-card-copy" title="Copy to clipboard" data-id="${update.id}">
                        <i data-lucide="copy" style="width: 16px; height: 16px;"></i>
                    </button>
                    <a class="card-btn" href="${update.link}" target="_blank" rel="noopener noreferrer" title="View official release notes">
                        <i data-lucide="external-link" style="width: 16px; height: 16px;"></i>
                    </a>
                </div>
            </article>
        `;
    }).join('');
    
    // Initialize Lucide icons inside loaded cards
    lucide.createIcons();
    
    // Add Event Listeners to cards and action buttons
    attachCardListeners();
}

// Attach Event Listeners to rendered cards
function attachCardListeners() {
    // Card Selection Toggle (Clicking on card content or selector toggles selection, except on action buttons/links)
    const cards = document.querySelectorAll('.update-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If the user clicked on an action button or link inside the card, don't toggle selection
            if (e.target.closest('.card-actions') || e.target.closest('.card-content a')) {
                return;
            }
            
            const updateId = card.dataset.id;
            toggleSelection(updateId);
        });
    });
    
    // Individual Card Tweet Button
    const tweetButtons = document.querySelectorAll('.btn-card-tweet');
    tweetButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const updateId = btn.dataset.id;
            const update = appState.updates.find(u => u.id === updateId);
            if (update) {
                openTweetModalForSingleUpdate(update);
            }
        });
    });
    
    // Individual Card Copy Button
    const copyButtons = document.querySelectorAll('.btn-card-copy');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const updateId = btn.dataset.id;
            const update = appState.updates.find(u => u.id === updateId);
            if (update) {
                const textToCopy = formatUpdateForClipboard(update);
                copyTextToClipboard(textToCopy);
            }
        });
    });
}

// Toggle Selection State of a Card
function toggleSelection(updateId) {
    if (appState.selectedUpdates.has(updateId)) {
        appState.selectedUpdates.delete(updateId);
    } else {
        appState.selectedUpdates.add(updateId);
    }
    
    // Update card styling directly for instant feedback
    const card = document.querySelector(`.update-card[data-id="${updateId}"]`);
    if (card) {
        card.classList.toggle('selected', appState.selectedUpdates.has(updateId));
    }
    
    updateSelectionBar();
}

// Clear all card selections
function clearSelection() {
    appState.selectedUpdates.clear();
    document.querySelectorAll('.update-card').forEach(card => {
        card.classList.remove('selected');
    });
    updateSelectionBar();
}

// Update the Floating Selection Bar state
function updateSelectionBar() {
    const selectedCount = appState.selectedUpdates.size;
    
    if (selectedCount > 0) {
        selectionCount.textContent = selectedCount;
        selectionActionBar.querySelector('.selection-label').textContent = 
            selectedCount === 1 ? 'update selected' : 'updates selected';
        selectionActionBar.classList.add('visible');
    } else {
        selectionActionBar.classList.remove('visible');
    }
}

// Format a single update for clipboard
function formatUpdateForClipboard(update) {
    return `BigQuery Update [${update.date}] (${update.type}):\n${update.description_text}\n\nRead more: ${update.link}`;
}

// Copy Text to Clipboard utility
function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        showToast('Failed to copy to clipboard', 'error');
    });
}

// Copy all selected updates
function copySelectedUpdates() {
    const selected = Array.from(appState.selectedUpdates).map(id => {
        const update = appState.updates.find(u => u.id === id);
        return update ? formatUpdateForClipboard(update) : '';
    }).filter(text => text !== '');
    
    if (selected.length > 0) {
        copyTextToClipboard(selected.join('\n\n---\n\n'));
    }
}

// Open Tweet Modal for a single update
function openTweetModalForSingleUpdate(update) {
    // Twitter URLs count as 23 characters.
    // Available characters = 280 - 23 (url) - 1 (space) = 256 characters.
    const maxTextLength = 250; // Keep slightly safe
    
    let tweetPrefix = `BigQuery [${update.date}] (${update.type}): `;
    let desc = update.description_text;
    
    let fullTweetText = tweetPrefix + desc;
    
    if (fullTweetText.length > maxTextLength) {
        // Truncate description to fit within limits
        const availableSpace = maxTextLength - tweetPrefix.length - 3; // -3 for '...'
        desc = desc.substring(0, availableSpace) + '...';
        fullTweetText = tweetPrefix + desc;
    }
    
    openTweetModal(fullTweetText, update.link);
}

// Open Tweet Modal for selected updates
function openTweetModalForSelection() {
    const selectedIds = Array.from(appState.selectedUpdates);
    
    if (selectedIds.length === 0) return;
    
    if (selectedIds.length === 1) {
        const update = appState.updates.find(u => u.id === selectedIds[0]);
        if (update) {
            openTweetModalForSingleUpdate(update);
        }
        return;
    }
    
    // Multiple updates selected
    const selectedUpdates = selectedIds.map(id => appState.updates.find(u => u.id === id)).filter(Boolean);
    
    // Create a aggregated tweet
    const dates = [...new Set(selectedUpdates.map(u => u.date))];
    const types = [...new Set(selectedUpdates.map(u => u.type))];
    
    let tweetText = `Check out these new BigQuery updates (${dates.join(', ')}):\n`;
    
    selectedUpdates.forEach((update, idx) => {
        const line = `- [${update.type}] ${update.description_text}`;
        if (tweetText.length + line.length < 240) { // Keep some buffer
            tweetText += line + '\n';
        } else if (!tweetText.endsWith('...\n') && idx < selectedUpdates.length) {
            tweetText += `- And ${selectedUpdates.length - idx} more updates...\n`;
        }
    });
    
    // Use the link of the first selected update or the generic BigQuery release notes URL
    const mainLink = selectedUpdates[0].link.split('#')[0] || "https://docs.cloud.google.com/bigquery/docs/release-notes";
    
    openTweetModal(tweetText.trim(), mainLink);
}

// Open Tweet Modal UI
function openTweetModal(text, url) {
    tweetTextarea.value = text;
    tweetUrlPreview.textContent = url;
    
    // Characters calculation
    updateCharCount(text.length);
    
    tweetModal.classList.add('open');
    tweetTextarea.focus();
    
    // Bind publish button
    publishTweetBtn.onclick = () => {
        publishTweet(tweetTextarea.value, url);
    };
}

// Close Tweet Modal UI
function closeTweetModal() {
    tweetModal.classList.remove('open');
}

// Update Modal Character Counter UI
function updateCharCount(length) {
    charCount.textContent = length;
    
    // Style warning states
    const editor = document.querySelector('.tweet-editor-wrapper');
    if (length > 250 && length <= 280) {
        charCount.className = 'limit-close';
        editor.style.borderColor = 'var(--color-deprecation)';
    } else if (length > 280) {
        charCount.className = 'limit-exceeded';
        editor.style.borderColor = 'var(--color-issue)';
        publishTweetBtn.disabled = true;
        publishTweetBtn.style.opacity = '0.5';
    } else {
        charCount.className = '';
        editor.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        publishTweetBtn.disabled = false;
        publishTweetBtn.style.opacity = '1';
    }
}

// Publish Tweet via Twitter Web Intent
function publishTweet(text, url) {
    if (text.length > 280) {
        showToast('Tweet exceeds character limit of 280!', 'error');
        return;
    }
    
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    
    // Open Twitter intent in a new window/tab
    window.open(intentUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    closeTweetModal();
    showToast('Redirected to Twitter to publish!', 'success');
}

// Toast Notifications helper
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'alert-octagon';
    
    toast.innerHTML = `
        <i data-lucide="${icon}" style="width: 18px; height: 18px; flex-shrink: 0;"></i>
        <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    lucide.createIcons();
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}
