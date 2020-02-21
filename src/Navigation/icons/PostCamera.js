import React from "react"
import { SvgXml } from "react-native-svg"

const xml = `<svg width="44px" height="34px" viewBox="0 0 44 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="icons-303-lines" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="photography" transform="translate(-2.000000, -7.000000)" stroke="#000000" stroke-width="4">
            <g transform="translate(4.000000, 9.000000)">
                <path d="M27,1.77635684e-15 L13,1.77635684e-15 L9,5 L3.00032973,5 C1.3486445,5 0,6.33915679 0,7.99109042 L0,27.0089096 C0,28.6582294 1.34054993,30 2.99420208,30 L37.0035095,30 C38.6584255,30 40,28.6582294 40,27.0089096 L40,7.99109042 C40,6.33915679 38.6513555,5 36.9996703,5 L31,5 L27,1.77635684e-15 Z" id="Combined-Shape"></path>
                <circle id="Oval" cx="20" cy="16" r="7"></circle>
            </g>
        </g>
    </g>
</svg>`

const PostCamera = () => <SvgXml xml={xml} width="100%" height="100%" />

export default PostCamera
