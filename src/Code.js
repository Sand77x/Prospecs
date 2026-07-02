function onOpen() {
    SlidesApp.getUi()
        .createMenu('Prospecs')
        .addItem('Highlight Selection', 'highlightSelection')
        .addToUi();
}

function highlightSelection() {
    const selection = SlidesApp.getActivePresentation().getSelection();
    const textRange = selection.getTextRange();

    if (textRange == null || textRange.getLength() === 0) {
        SlidesApp.getUi().alert('Prospecs: Nothing selected');
        return;
    }

    const lexer = new Lexer(textRange.asString());
    const tokens = lexer.tokenize();

    const classifier = new Classifier(tokens);
    classifier.classify();

    const colorizer = new Colorizer(textRange, tokens);
    colorizer.colorize();

    SlidesApp.getUi().alert('Prospecs: Done!');
}
