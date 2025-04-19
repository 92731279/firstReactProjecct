import React from 'react';
// Nimportiw React bch najmou na3mlou component

const ErrorModal = ({ errorMessage, onClose }) => {
  // Component ErrorModal ya5ou zoud props :
  // - errorMessage : le message li bch n'affichiw
  // - onClose : fonction li tetnaffadh ki user yenzel "Close"

  return (
    <div className="modal-overlay">
      {/* Container mta3 modal — t3abbi l'écran b background mte3 overlay */}

      <div className="modal-content">
        {/* Contenu mta3 popup modal */}

        <h3>Invalid Input</h3>
        {/* Titre l'modal (statique) */}

        <div className="error-message">{errorMessage}</div>
        {/* Message erreur li jey mel parent */}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        {/* Bouton li user yenzel 3lih bch ykhallem l'popup — onClose tetnaffadh */}
      </div>
    </div>
  );
};

export default ErrorModal;
// Nexportiw l’component bch najmou nesta3mlouh fi d'autres composants (ex: MainContent)
