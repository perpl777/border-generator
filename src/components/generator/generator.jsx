
import React, { useState, useRef, useEffect } from 'react';
import styles from './generator.module.css';

function BorderGenerator() {
    const [borderSize, setBorderSize] = useState(1);
    const [borderColor, setBorderColor] = useState('#000000');
    const [borderStyle, setBorderStyle] = useState('solid');
    const [borderShadow, setBorderShadow] = useState({
        horizontal: 0,
        vertical: 0,
        blur: 0,
        spread: 0,
        color: 'rgba(0, 0, 0, 0.5)',
        inset: false
    });
    const [borderResult, setBorderResult] = useState('');

    const squareRef = useRef(null);


    const generateBorder = () => {
        squareRef.current.style.border = `${borderSize}px ${borderStyle} ${borderColor}`;
        squareRef.current.style.boxShadow = `
            ${borderShadow.horizontal}px 
            ${borderShadow.vertical}px 
            ${borderShadow.blur}px 
            ${borderShadow.spread}px 
            ${borderShadow.color} 
            ${borderShadow.inset ? 'inset' : ''}`;
    }
    

    useEffect(() => {
        generateBorder();
        setBorderResult(`
            border: ${borderSize}px ${borderStyle} ${borderColor};
            box-shadow: ${borderShadow.horizontal}px ${borderShadow.vertical}px ${borderShadow.blur}px ${borderShadow.spread}px ${borderShadow.color} ${borderShadow.inset ? 'inset' : ''};`);
    }, [borderSize, borderColor, borderStyle, borderShadow]);

    return (
        <div className={styles.container}>
            <div className={styles.square} ref={squareRef}></div>
    
            <div className={styles.settings}>
                <div className={styles.sizeAndColor}>
                    <label>Size
                        <input 
                            type="range" 
                            min="1" 
                            max="50" 
                            value={borderSize} 
                            onChange={(e) => setBorderSize(e.target.value)} />
                    </label>
                
                    <label>Border color
                        <input 
                            type="color" 
                            value={borderColor} 
                            onChange={(e) => setBorderColor(e.target.value)} />
                    </label>
                </div>

                <div className={styles.stylesborder}>
                    <label>
                        <input type="radio" value="solid" checked={borderStyle === 'solid'} onChange={() => setBorderStyle('solid')} />
                        Solid
                    </label>
                    <label>
                        <input type="radio" value="dashed" checked={borderStyle === 'dashed'} onChange={() => setBorderStyle('dashed')} />
                        Dashed
                    </label>
                    <label>
                        <input type="radio" value="double" checked={borderStyle === 'double'} onChange={() => setBorderStyle('double')} />
                        Double
                    </label>
                    <label>
                        <input type="radio" value="dotted" checked={borderStyle === 'dotted'} onChange={() => setBorderStyle('dotted')} />
                        Dotted
                    </label>
                    <label>
                        <input type="radio" value="ridge" checked={borderStyle === 'ridge'} onChange={() => setBorderStyle('ridge')} />
                        Ridge
                    </label>
                    <label>
                        <input type="radio"value="inset" checked={borderStyle === 'inset'} onChange={() => setBorderStyle('inset')} />
                        Inset
                    </label>
                    <label>
                        <input type="radio" value="outset" checked={borderStyle === 'outset'} onChange={() => setBorderStyle('outset')} />
                        Outset
                    </label>
                    <label>
                        <input type="radio" name="border-style" value="groove" checked={borderStyle === 'groove'} onChange={() => setBorderStyle('groove')} />
                        Groove
                    </label>
                </div>

                <div className={styles.shadow}>
                    <p>Shadow</p>
                    <div className={styles.shadowInputs}>
                        <label>Horizontal
                            <input type="range" min="-100" max="100" value={borderShadow.horizontal} onChange={(e) => setBorderShadow({ ...borderShadow, horizontal: parseInt(e.target.value) })} />
                        </label>
                        <label>Vertical
                            <input type="range" min="-100" max="100" value={borderShadow.vertical} onChange={(e) => setBorderShadow({ ...borderShadow, vertical: parseInt(e.target.value) })} />
                        </label>
                        <label>Blur
                            <input type="range" min="0" max="100" value={borderShadow.blur} onChange={(e) => setBorderShadow({ ...borderShadow, blur: parseInt(e.target.value) })} />
                        </label>
                        <label>Spread
                            <input type="range" min="0" max="100" value={borderShadow.spread} onChange={(e) => setBorderShadow({ ...borderShadow, spread: parseInt(e.target.value) })} />
                        </label>
                        <label>Color
                            <input type="color" value={borderShadow.color} onChange={(e) => setBorderShadow({ ...borderShadow, color: e.target.value })} />
                        </label>
                        <label>
                            <input type="checkbox" checked={borderShadow.inset} onChange={() => setBorderShadow({ ...borderShadow, inset: !borderShadow.inset })} />
                            Inset
                        </label>
                    </div>
                </div>
            </div>
    
            <div className={styles.result}>
                <textarea className={styles.textarea} value={borderResult}></textarea>
                <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(borderResult)}>Copy</button>
            </div>
        </div>
    );
}

export default BorderGenerator;
