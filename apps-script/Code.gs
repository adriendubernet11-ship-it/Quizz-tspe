// À coller dans script.google.com (voir README.md pour la procédure complète).
// Ce script reçoit les résultats envoyés par le site et les ajoute
// comme nouvelle ligne dans l'onglet "Resultats" du Google Sheet lié.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Resultats');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Resultats');
    sheet.appendRow(['Horodatage', 'Nom', 'Classe', 'Chapitre', 'Score', 'Total', 'Date envoi']);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nom,
    data.classe,
    data.chapitre,
    data.score,
    data.total,
    data.date
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
