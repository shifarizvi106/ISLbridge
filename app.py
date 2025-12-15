def text_to_signs(text):
    words = clean_and_split(text)
    words = remove_stopwords(words)

    signs = []
    for word in words:
        if word in SIGN_DICT:
            signs.append(SIGN_DICT[word])

    return signs

