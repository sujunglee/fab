import React from "react"
import { SvgXml } from "react-native-svg"

const xml = `<svg width="94px" height="44px" viewBox="0 0 94 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="icons-303-lines" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="Artboard" transform="translate(-5.000000, -2.000000)" stroke="#000000" stroke-width="4">
            <g id="Group" transform="translate(7.000000, 4.000000)">
                <g id="check-3-copy">
                    <circle id="Oval-9" cx="20" cy="20" r="20"></circle>
                    <polyline id="Rectangle" points="29 14 17 26 11 20"></polyline>
                </g>
                <g id="error-3-copy" transform="translate(50.000000, 0.000000)">
                    <circle id="Oval-9" cx="20" cy="20" r="20"></circle>
                    <path d="M12,12 L28,28" id="Line"></path>
                    <path d="M12,12 L28,28" id="Line-Copy" transform="translate(20.000000, 20.000000) scale(-1, 1) translate(-20.000000, -20.000000) "></path>
                </g>
            </g>
        </g>
    </g>
</svg>`

const VoteIcon = () => <SvgXml xml={xml} width="100%" height="100%" />

export default VoteIcon
