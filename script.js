/*--------------------------------Speech Output--------------------------------*/
function inputSpeaker ()
{
    let input_msg = document.getElementById( "floatingTextarea2" ).value;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = document.getElementById( "inputLanguage" ).value;

    console.log( 'inputMsg: ', input_msg );

    if ( input_msg == '' )
    {
        console.log( 'input_msg: Empty' );
        speech.text = "Oho, It's empty, you should write something to translate";
        speech.volume = 1;
        speech.rate = 0.7;
        speech.pitch = 1;

        window.speechSynthesis.speak( speech );
    } else
    {
        speech.text = input_msg;
        speech.volume = 1;
        speech.rate = 0.7;
        speech.pitch = 1;

        window.speechSynthesis.speak( speech );
    }
}

function outputSpeaker ()
{
    let output_msg = document.getElementById( "TranslatedTexts" ).innerHTML;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = document.getElementById( "outputLanguage" ).value;

    console.log( 'outputMsg: ', output_msg );

    if ( output_msg == "" )
    {
        speech.text = "Oho, It's empty, you should write something to translate";
        speech.volume = 1;
        speech.rate = 0.7;
        speech.pitch = 1;
        window.speechSynthesis.speak( speech );
    } else
    {
        speech.text = output_msg;
        speech.volume = 1;
        speech.rate = 0.9;
        speech.pitch = 1;
        window.speechSynthesis.speak( speech );
    }
}

/*--------------------------------Speech Input--------------------------------*/
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.onresult = function ( event )
{
    if ( event.results.length > 0 )
    {
        floatingTextarea2.value = event.results[ 0 ][ 0 ].transcript;
        document.getElementById( 'TranslatedTexts' ).innerHTML = document.getElementById( 'floatingTextarea2' ).value
        translateTexts();
    }
}

/*------------------------------popupmsg-----------------------------------*/
// input textarea
function micPopup ()
{
    let popup = document.getElementById( "micPopup" );
    popup.classList.add( "show" );
    let myVar = setTimeout( popoutFunc1, 1000 );
}
function popoutFunc1 ()
{
    let popup = document.getElementById( "micPopup" );
    popup.classList.remove( "show" );

}

function speakerPopup ()
{
    let popup = document.getElementById( "spkrPopup" );
    popup.classList.add( "show" );
    let myVar = setTimeout( popoutFunc2, 1000 );
}
function popoutFunc2 ()
{
    let popup = document.getElementById( "spkrPopup" );
    popup.classList.remove( "show" );

}

function copyPopup ()
{
    let popup = document.getElementById( "cpyPopup" );
    popup.classList.add( "show" );
    let myVar = setTimeout( popoutFunc3, 1000 );
}
function popoutFunc3 ()
{
    let popup = document.getElementById( "cpyPopup" );
    popup.classList.remove( "show" );

}

function ErasePopup ()
{
    let popup = document.getElementById( "rmvPopup" );
    popup.classList.add( "show" );
    let myVar = setTimeout( popoutFunc4, 1000 );
}
function popoutFunc4 ()
{
    let popup = document.getElementById( "rmvPopup" );
    popup.classList.remove( "show" );

}

// translated div
function speakerPopupTr ()
{
    let popup = document.getElementById( "spkr2Popup" );
    popup.classList.add( "show" );
    let myVar = setTimeout( popoutFunc5, 1000 );
}
function popoutFunc5 ()
{
    let popup = document.getElementById( "spkr2Popup" );
    popup.classList.remove( "show" );

}

function copyPopupTr ()
{
    let popup = document.getElementById( "cpyPopupTr" );
    popup.classList.add( "show" );
    let myVar = setTimeout( popoutFunc6, 1000 );
}
function popoutFunc6 ()
{
    let popup = document.getElementById( "cpyPopupTr" );
    popup.classList.remove( "show" );

}

/*------------------------------Copy Text-----------------------------------*/
// input textarea
function copyTexts ()
{
    document.querySelector( "textarea" ).select();
    document.execCommand( 'copy' );

    copiedPopup();

    function copiedPopup ()
    {
        let popup = document.getElementById( "cpdPopup" );
        popup.classList.add( "show" );
        let myVar = setTimeout( popoutFunc7, 1000 );
    }
    function popoutFunc7 ()
    {
        let popup = document.getElementById( "cpdPopup" );
        popup.classList.remove( "show" );
    }
}

// translated div
function copyTextsTr ()
{
    var range = document.createRange();
    range.selectNode( document.getElementById( "TranslatedTexts" ) );
    window.getSelection().removeAllRanges();
    window.getSelection().addRange( range );
    document.execCommand( "copy" );
    window.getSelection().removeAllRanges();

    copiedPopup();

    function copiedPopup ()
    {
        let popup = document.getElementById( "cpdPopupTr" );
        popup.classList.add( "show" );
        let myVar = setTimeout( popoutFunc8, 1000 );
    }
    function popoutFunc8 ()
    {
        let popup = document.getElementById( "cpdPopupTr" );
        popup.classList.remove( "show" );
    }
}

/*------------------------------Remove Text-----------------------------------*/
function removeTxt ()
{
    document.getElementById( "floatingTextarea2" ).value = "";
    document.getElementById( "TranslatedTexts" ).innerHTML = "";

}

/*------------------------------Toggle I/O-----------------------------------*/
function toggleAll ()
{
    let imageToSpin = document.getElementById( 'toggleBtn' );
    // imageToSpin.onclick = function ()
    // {
    imageToSpin.classList.toggle( 'rotated' )
    // };

    let toggleTempTxts = document.getElementById( "TranslatedTexts" ).innerHTML;
    document.getElementById( "TranslatedTexts" ).innerHTML = document.querySelector( "textarea" ).value;
    document.getElementById( "floatingTextarea2" ).value = toggleTempTxts;

    let toggleTempLangs = document.getElementById( "inputLanguage" ).value;
    document.getElementById( "inputLanguage" ).value = document.getElementById( "outputLanguage" ).value;
    document.getElementById( "outputLanguage" ).value = toggleTempLangs;

    translateTexts();
}

/*------------------------------Translate-----------------------------------*/
function translateTexts ()
{
    var inputLanguage = document.getElementById( "inputLanguage" ).value;
    var outputLanguage = document.getElementById( "outputLanguage" ).value;
    var inputText = document.getElementById( "floatingTextarea2" ).value

    console.log( 'working' );

    async function textTranslator ()
    {
        const res = await fetch( "https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify( {
                q: `${ inputText }`,
                source: `${ inputLanguage }`,
                target: `${ outputLanguage }`
            } ),
            headers: { "Content-Type": "application/json" }
        } );

        let data = await res.json();
        console.log( data )
        var outputText = document.getElementById( "TranslatedTexts" )
        if ( inputText == null || data.translatedText == undefined )
        {
            outputText.innerHTML = ""
        }
        else
        {
            outputText.innerHTML = data.translatedText;
        }
    }
    textTranslator();
}