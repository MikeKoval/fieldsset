class CodeWidget {
    /**
     * @param rootElem {HTMLElement} - root element of code widget
     * @param code {string} - initial code
     * @param controlNumber {int} - elements number for input
     * @param controlSize {int} - max chars number in every input
     */
    constructor(rootElem, code, controlNumber, controlSize) {
        this.controlsNumber = controlNumber || 2;
        this.controlSize = controlSize || 3;
    
        this.currCursorPos = 0;
        this.currCtrlIndex = 0;
        this.controls = [];
    
        this._createControls();
        this.setCode(code);
    
        this._pasteControlsIntoDOM(rootElem);
    }

    /**
     * @return {string} - current code value
     */
    getCode() {
        let buff = "";

        for(let i = 0; i < this.controlsNumber; i += 1) {
            buff += this.controls[i].value;
        }

        return buff;
    };
    
    /**
     * @param code {string} - new code value
     */
    setCode(code) {
        for(let i = 0; i < this.controlsNumber; i += 1) {
            this.controls[i].value = code.substring(i * this.controlSize, (i + 1) * this.controlSize);
        }
    };

    /**
     * @param rootElem {HTMLElement} - root element of code widget
     */
    _pasteControlsIntoDOM(rootElem) {
        for(let i = 0; i < this.controlsNumber; i += 1) {
            rootElem.appendChild(this.controls[i]);
        }
    };
    
    _createControls() {
        for(let i = 0; i < this.controlsNumber; i += 1) {
            this.controls.push(elt('input', {type: 'text', 'data-index': i}));
        }
    };
}