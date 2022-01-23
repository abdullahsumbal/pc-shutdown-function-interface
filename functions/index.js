const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// http callable function (setting PC state)
exports.shutdown = functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated', 
        'only authenticated users set state'
      );
    }
    if (data.secret != 'shapaplay') {
      throw new functions.https.HttpsError(
        'invalid-argument', 
        'incorrect secret'
      );
    }
    if (data.state != 0) {
        throw new functions.https.HttpsError(
          'invalid-argument', 
          'incorrect state'
        );
      }
    return admin.firestore().collection('shutdown').doc('pc_state').update({state: 0}).then(() => {
      console.log('update state succeeded!');});
  });