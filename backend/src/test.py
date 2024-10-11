import re

url = r"https://www.google.com/maps/place/BHub+Bouldering34+==3343/@3.1003621,101.6293694,17z/data=!3m1!4b1!4m6!3m5!1s0x31cc4b198acf5b35:0xe22ffd7c25489ee1!8m2!3d3.1003621!4d101.6319443!16s%2Fg%2F11vqnthfh1?entry=ttu&g_ep=EgoyMDI0MTAwNS4wIKXMDSoASAFQAw%3D%3D"


def validate_url(url) -> bool:
    url_regex = "^https?:\/\/(www\.)?google\.[a-z]{2,3}(\.[a-z]{2})?\/maps\/place\/(\S+(\+\S+)+)\/(@[\d,.\w]+)\/(data\=[!:.%\w]+\?)"
    if re.match(url_regex, url):
        return True

    return False


print(validate_url(url))
