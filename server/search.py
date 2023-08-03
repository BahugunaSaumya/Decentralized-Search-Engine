import json
import sys
import threading
import random
import time

import requests
from bs4 import BeautifulSoup


# Load the free proxy list from a text file
import requests
from bs4 import BeautifulSoup

# URL of the website with the proxy list
url = 'https://free-proxy-list.net/'

# Send a request to the website
response = requests.get(url)

# Parse the HTML content of the response using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Find the table with the proxy list
table = soup.find('table')

# Extract the rows of the table
rows = table.find_all('tr')

# Loop through the rows and extract the proxy information
proxy_list = []
for row in rows[1:]:
    columns = row.find_all('td')
    ip = columns[0].text
    port = columns[1].text
    proxy = f"{ip}:{port}"
    proxy_list.append(proxy)


# User agent string to send with requests to avoid getting blocked by DuckDuckGo
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}


# Function to scrape DuckDuckGo search and extract titles, URLs and snippets
def search(query):
    # Select a random proxy from the list
    
   

    # Construct URL for DuckDuckGo search with query string
    query = query.replace(' ', '+')
    url = f"https://duckduckgo.com/html/?q={query}&kl=ca-en"

    try:
        proxy = random.choice(proxy_list)
        proxies =  {"http://": proxy, "https://": proxy}
        res = requests.get(url, headers=headers, proxies=proxies)
       
       
        
    except :
       search(query)

    
    soup = BeautifulSoup(res.text, 'html.parser')
   
    soup = soup.find_all('div', class_='result')
    
    results = []
    for i, result in enumerate(soup):
        link = result.find('a', class_='result__url')
        title = result.find('a', class_='result__url').text.strip()
        url = result.find('a', class_='result__url')['href']
        snippet = result.find('a', class_='result__snippet').text.strip()
        results.append({'title': title, 'snippet': snippet, 'url': url})
    # if(soup==[]):
    #   results.append({'title': 'ERROR','snippet':'could not find solution','url':'/'}) 
    return results


# Thread function to perform the search and add results to the dictionary
def search_thread(query, result_dict):

    # Check if the query has been searched before and if the time difference is less than 5 mins
    if query in result_dict:
        last_searched_time = result_dict[query]['time']
        time_diff = time.time() - last_searched_time
        if time_diff < 300:
            return
    
    results = search(query)
    with lock:
        if results != []:
            # Add the query and results to the dictionary with the current time
            result_dict[query] = {'time': time.time(), 'results': json.dumps(results)}
        else :
             result_dict[query] = {'time': time.time(), 'results': json.dumps([{'title':"Sorry The search engine is down keep trying".strip(),'snippet':"Sorry The search engine is down keep trying".strip(),'url':"/".strip()}])}              

 

# Get the string array argument
string_array = sys.argv[2]

# Load the JSON string into a Python dictionary
queries =json.loads(string_array) # {"what is the weather in my location","America", "Snow"}#

# Dictionary to hold the search results
two = sys.argv[1]

result_dict = {}#json.loads(two)
# Lock object to synchronize threads writing to the result_dict
lock = threading.Lock()

# Create and start threads to perform the searches
threads = []
for query in queries:
    thread = threading.Thread(target=search_thread, args=(query, result_dict))
    threads.append(thread)
    thread.start()

# Wait for all threads to finish
for thread in threads:
    thread.join()

sys.stdout.write(json.dumps(result_dict))
sys.stdout.flush()
# Write the updated data back to the file
# import tempfile
# import shutil

# # Open the file and load the existing data into a dictionary
# with open('search_results.json', 'r') as f:
#     existing_data = json.load(f)

# # Add new data and update existing data to the dictionary
# # For example, if `result_dict` contains new data and data to be updated
# for key, value in result_dict.items():
#     existing_data[key] = value
    
# # Write the updated data to a temporary file
# with tempfile.NamedTemporaryFile(mode='w', delete=False) as tmp_file:
#     json.dump(existing_data, tmp_file, indent=4)

# # Replace the original file with the temporary file
# shutil.move(tmp_file.name, 'search_results.json')

# Print the updated search results

