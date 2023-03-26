import markovify
import requests
from bs4 import BeautifulSoup
import html_text

def get_text(url: str):
    """Pulls the fic at the given URL and converts it from HTML to plain text."""
        
    html = requests.get(url)
    soup = BeautifulSoup(html.content, "html.parser")
    chapters = soup.find(id="chapters").find_all("div", class_="userstuff")

    text = [html_text.extract_text(str(chapter)) for chapter in chapters]

    return text


def create_model(text: str):
    """Creates a markov chain model trained on the given text."""

    return markovify.Text(text, state_size=2)


if __name__ == "__main__":
    nano_URL = "http://archiveofourown.org/downloads/43355298/Zero%20Edits%20Shin%20Megami.html?updated_at=1678777481"
    text = get_text(nano_URL)
    text_model = create_model(text)

    for i in range(10):
        print(text_model.make_sentence())