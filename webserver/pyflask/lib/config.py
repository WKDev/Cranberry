import os
import configparser

libdir = os.path.dirname(__file__)
config = configparser.ConfigParser()

config.read(libdir + '\\config.ini', encoding='UTF-8')

# apiKey = config['AUTH']['api_key']
# apiSecret = config['AUTH']['api_secret']
# protocol = config['SERVER']['protocol']
# domain = config['SERVER']['domain']
# prefix = config['SERVER']['prefix'] and config['SERVER']['prefix'] or ''

apiKey = 'NCSJKXIANQ3IBSI2'
apiSecret = 'ZP0XIXILKLPTTRR9NJGXVV9Z94QBU15V'
protocol = 'https'
domain = 'api.solapi.com'
prefix = ''


def getUrl(path):
    url = '%s://%s' % (protocol, domain)
    url = url + path
    return url
