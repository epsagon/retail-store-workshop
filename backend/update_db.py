"""
update stock for catalog shop
"""

import sys
import boto3


CATALOG_ITEMS = [
    {
        'item_id': 1000,
        'name': 'Kindle Paperwhite',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Our thinnest, lightest Kindle Paperwhite yet, with a sleek, modern design so you can read comfortably for hours. Features our signature 300 ppi, glare-free Paperwhite display, laser-quality text, and twice the storage of the previous generation. Plus a single battery charge lasts weeks, not hours',
    },
    {
        'item_id': 1001,
        'name': 'Echo Dot (3rd Gen)',
        'price': 50,
        'rating': 3,
        'stock_left': 1,
        'description': 'Our most popular Echo is now even better. With a new speaker and design, Echo Dot is a voice-controlled smart speaker with Alexa, perfect for any room. Just ask for music, news, information, and more. You can also call almost anyone and control compatible smart home devices with your voice',
    },
    {
        'item_id': 1002,
        'name': 'Fire TV Stick 4K',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Now you can control your compatible TV, soundbar, and receiver with new power, volume, and mute buttons. Just press and ask to easily find, launch, and control movies and TV shows',
    },
    {
        'item_id': 1003,
        'name': 'Echo Show (2nd Gen)',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'The all-new Echo Show features a new look, a vibrant 10.1” HD screen, built-in smart home hub, and improved speakers. Just ask Alexa to show you a recipe, watch live TV and sports with Hulu, make video calls, or see who’s at the front door.',
    },
    {
        'item_id': 1004,
        'name': 'Echo Spot',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Echo Spot brings you everything you love about Alexa, in a stylish and compact design that can show you things. Just ask to see the weather, get the news with a video flash briefing, set an alarm, see lyrics with Amazon Music, see your calendar, browse and listen to Audible audiobooks, and more. Personalize your Spot with a collection of clock faces to suit your style or set a photo background from Prime Photos. Plus, make calls to friends and family or make video calls to anyone with an Echo Spot, Echo Show, or the Alexa App',
    },
    {
        'item_id': 1005,
        'name': 'Echo Dot Kids Edition',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Introducing a hands-free, voice-controlled speaker with Alexa, designed with kids in mind. Echo Dot Kids Edition can play age-appropriate music, answer questions, tell stories, control compatible smart home devices, and more. Includes a black Echo Dot, a 1-year subscription to FreeTime Unlimited, a fun kid-friendly case, and a 2-year worry-free guarantee. If they break it, return it and we’ll replace it for free',
    },
    {
        'item_id': 1006,
        'name': 'Fire 7 Tablet with Alexa',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Fire 7 features a 1024 x 600 IPS display with 171 ppi for a bright display with vivid colors and whiter whites for a great viewing experience from all angles. Compared to the previous generation, Fire 7 features an improved display that provides higher contrast and sharper text',
    },
    {
        'item_id': 1007,
        'name': 'Kindle Oasis E-reader - Graphite',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': """No more soggy pages with the Kindle Oasis—it's IPX8 rated to protect against immersion in up to two meters of fresh water for up to 60 minutes. And it's built to withstand getting splashed at the beach or dropped in the bathtub, hot tub, or pool. """,
    },
    {
        'item_id': 1008,
        'name': 'Fire HD 10 Tablet with Alexa Hands-Free',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Fire HD 10 features a brilliant 10.1” 1080p Full HD display (1920 x 1200) with over 2 million pixels (224 ppi). Enjoy widescreen movies, videos, and games with wide viewing angles, less glare, and more brightness thanks to a stunning IPS (in-plane-switching) LCD display',
    },
    {
        'item_id': 1009,
        'name': 'Fire 7 Kids Edition Tablet',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Amazon FreeTime Unlimited is the first-ever all-in-one subscription that brings together all the types of content that kids ages 3-12 want, with over 15,000 books, movies, TV shows, educational apps, and games. Fire Kids Edition includes a year of Amazon FreeTime Unlimited at no additional cost',
    },
    {
        'item_id': 1010,
        'name': 'Fire TV Cube',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Fire TV Cube is the first hands-free streaming media player with Alexa, delivering an all-in-one entertainment experience. From across the room just say, “Alexa, play Billions” and Fire TV Cube turns on your TV and starts playing the SHOWTIME drama, allowing you to control your entertainment with voice commands. Watch as thousands of movies and TV episodes come to life with vibrant colors and detailed contrast in 4K Ultra HD and HDR',
    },
    {
        'item_id': 1011,
        'name': 'Fire TV Stick',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Just plug Fire TV Stick into your HDTV and start streaming in minutes. With the Alexa Voice Remote, press and ask to easily find your favorite movies and TV episodes, plus live news and sports. All-new power and volume buttons give you more control',
    },
    {
        'item_id': 1012,
        'name': 'Fire TV Recast',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Fire TV Recast is a DVR that lets you watch and record over-the-air TV at home or on-the-go with no monthly fees',
    },
    {
        'item_id': 1013,
        'name': 'Amazon Ethernet Adapter for Amazon Fire TV Devices',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Slow or weak Wi-Fi connection? Take advantage of the speed and reliability of wired internet',
    },
    {
        'item_id': 1014,
        'name': 'Amazon Cloud Cam Security Camera',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Amazon Cloud Cam features everything you need to help keep your home safe. When Cloud Cam sees any activity you’ll receive a notification, allowing you to keep tabs on your home from anywhere. Our always-ready motion detection feature helps to capture activities right from the start',
    },
    {
        'item_id': 1015,
        'name': 'Amazon.com Gift Card in a Black Gift Box',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Amazon.com Gift Card in a Black Gift Box',
    },
    {
        'item_id': 1016,
        'name': 'Amazon.com Gift Card in a Mini Envelope',
        'price': 123,
        'rating': 3,
        'stock_left': 1,
        'description': 'Amazon.com Gift Card in a Mini Envelope',
    },
]

if __name__ == '__main__':
    ddb_client = boto3.resource('dynamodb', region_name=sys.argv[2])
    catalog_table = ddb_client.Table('CatalogTable')

    # Clean old
    results = catalog_table.scan()
    for item in results['Items']:
        catalog_table.delete_item(
            Key={'item_id': item['item_id']}
        )

    # Add new
    for i in range(int(sys.argv[1])):
        catalog_table.put_item(
            Item=CATALOG_ITEMS[i]
        )
