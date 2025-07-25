import os
import json

def collect_svg_files():
    base_path = 'assets'
    data = {'tops': [], 'bottoms': []}

    for category in ['tops', 'bottoms']:
        folder_path = os.path.join(base_path, category)
        if os.path.exists(folder_path):
            data[category] = [
                os.path.join(base_path, category, f)
                for f in os.listdir(folder_path)
                if f.endswith('.svg')
            ]
    
    with open('files.json', 'w') as f:
        json.dump(data, f)

# “Only run the code below this if this file is being run directly — not if it’s being imported into another script.” runs only if the file is executed directly
if __name__ == '__main__':
    collect_svg_files()
    print("files.json created!")
