function redirectToSelection(grade) {
    const targetPage = `redirectedPage2.html?grade=${grade}`;
    window.location.href = targetPage;
}

function selectExam(exam) {
    const targetPage = `redirectedPage3.html?exam=${encodeURIComponent(exam)}`;
    window.location.href = targetPage;
}

function selectLanguage(language) {
    // Redirect to redirectedPage4 and pass the selected language as a query parameter
    const targetPage = `redirectedPage4.html?language=${encodeURIComponent(language)}`;
    window.location.href = targetPage;
}