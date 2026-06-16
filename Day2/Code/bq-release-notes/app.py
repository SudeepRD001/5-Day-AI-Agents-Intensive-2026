import os
import time
import json
import logging
import urllib.request
import xml.etree.ElementTree as ET
from flask import Flask, jsonify, render_template, request
from bs4 import BeautifulSoup

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)

FEED_URL = "https://docs.cloud.google.com/feeds/bigquery-release-notes.xml"
CACHE_FILE = "release_notes_cache.json"
CACHE_DURATION_SECS = 3600  # 1 hour cache

def parse_release_notes(xml_data):
    """
    Parses the Atom XML feed and splits the entries into granular updates.
    """
    try:
        root = ET.fromstring(xml_data)
        ns = {'atom': 'http://www.w3.org/2005/Atom'}
        entries = root.findall('atom:entry', ns)
        
        all_updates = []
        
        for entry in entries:
            # Extract basic entry details
            title = entry.find('atom:title', ns)
            date_str = title.text if title is not None else "Unknown Date"
            
            updated = entry.find('atom:updated', ns)
            updated_str = updated.text if updated is not None else ""
            
            link = entry.find('atom:link', ns)
            link_str = link.attrib.get('href') if link is not None else ""
            
            content = entry.find('atom:content', ns)
            if content is None or not content.text:
                continue
                
            # Parse the HTML content of the entry using BeautifulSoup
            soup = BeautifulSoup(content.text, 'html.parser')
            
            # Find all <h3> elements which represent the update categories (e.g. Feature, Issue, Deprecation)
            h3s = soup.find_all('h3')
            
            if not h3s:
                # If there are no h3 tags, treat the entire content as a single general update
                text_content = soup.get_text(separator=' ').strip()
                all_updates.append({
                    "id": hash_update(date_str, "General", text_content),
                    "date": date_str,
                    "updated": updated_str,
                    "link": link_str,
                    "type": "General",
                    "description_html": str(soup),
                    "description_text": text_content
                })
                continue
                
            for h3 in h3s:
                update_type = h3.get_text().strip()
                
                # Extract all sibling elements until the next <h3>
                description_elems = []
                sibling = h3.next_sibling
                while sibling and sibling.name != 'h3':
                    if sibling.name:  # Only keep HTML elements, skip NavigableString/Whitespace
                        description_elems.append(str(sibling))
                    sibling = sibling.next_sibling
                    
                description_html = "".join(description_elems).strip()
                
                # Extract clean plain text for search and tweeting
                desc_soup = BeautifulSoup(description_html, 'html.parser')
                description_text = desc_soup.get_text(separator=' ').strip()
                
                # Clean up multiple whitespaces
                description_text = " ".join(description_text.split())
                
                all_updates.append({
                    "id": hash_update(date_str, update_type, description_text),
                    "date": date_str,
                    "updated": updated_str,
                    "link": link_str,
                    "type": update_type,
                    "description_html": description_html,
                    "description_text": description_text
                })
                
        return all_updates
    except Exception as e:
        logger.error(f"Error parsing release notes XML: {e}")
        raise

def hash_update(date_str, update_type, description_text):
    """
    Generates a deterministic unique ID for an update based on date, type, and text content.
    """
    import hashlib
    hash_input = f"{date_str}||{update_type}||{description_text}"
    return hashlib.md5(hash_input.encode('utf-8')).hexdigest()

def get_feed_data():
    """
    Fetches the feed from Google and parses it.
    """
    logger.info("Fetching fresh release notes feed from Google Cloud feeds...")
    try:
        req = urllib.request.Request(
            FEED_URL, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            xml_data = response.read()
        return parse_release_notes(xml_data)
    except Exception as e:
        logger.error(f"Network error fetching feed: {e}")
        raise RuntimeError(f"Failed to fetch feed from source: {e}")

def load_cached_notes(force_refresh=False):
    """
    Loads release notes from cache or fetches them fresh if cache is expired or force_refresh is True.
    """
    now = time.time()
    
    if not force_refresh and os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                cache_data = json.load(f)
                
            cache_time = cache_data.get("timestamp", 0)
            if now - cache_time < CACHE_DURATION_SECS:
                logger.info("Serving release notes from local cache file")
                return cache_data.get("updates", []), False # return updates and indicates NOT fresh
        except Exception as e:
            logger.warning(f"Failed to read cache file, fetching fresh: {e}")
            
    # If we get here, we need to fetch fresh data
    try:
        updates = get_feed_data()
        
        # Save to cache
        cache_data = {
            "timestamp": now,
            "updates": updates
        }
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cache_data, f, ensure_ascii=False, indent=2)
            
        return updates, True # return updates and indicates fresh
    except Exception as e:
        # If fetch fails but we have a cache file, serve expired cache as fallback
        if os.path.exists(CACHE_FILE):
            logger.warning(f"Fetch failed ({e}). Serving expired cache as fallback.")
            try:
                with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                    cache_data = json.load(f)
                return cache_data.get("updates", []), False
            except Exception as cache_err:
                logger.error(f"Failed to load fallback cache: {cache_err}")
        raise

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/release-notes')
def release_notes_api():
    force_refresh = request.args.get('force_refresh', 'false').lower() == 'true'
    try:
        updates, is_fresh = load_cached_notes(force_refresh=force_refresh)
        return jsonify({
            "success": True,
            "updates": updates,
            "count": len(updates),
            "is_fresh": is_fresh,
            "timestamp": time.time()
        })
    except Exception as e:
        logger.error(f"API Error: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    # Default Flask port is 5000, we bind to 127.0.0.1
    app.run(host='127.0.0.1', port=5000, debug=True)
