// Functia PRINCIPALA de compresie RLE 
// SE FOLOSESTE '#' ca separator pentru a evita confuzia cu cifrele din text
// Exemplu: "FFF2222" -> "F#32#4"
function compressRLE(text)
{
    let rez = "";
    let count = 1;
    const ESCAPE_CHAR = '#'; 

    for (let i = 0; i < text.length; i++)
    {
        if (text[i] === text[i + 1])
        {
            count++;
        }
        else 
        {
            // 1. pune caracterul de baza la rezultat
            rez += text[i];
            
            // 2. daca el s-a repetat, adaugam separatorul '#' inainte de numararul de repetitii
            if (count > 1)
            {
                rez += ESCAPE_CHAR; // adaugam separatorul
                rez += count;       // adaugam numarul de repetitii
            }
            
            count = 1;
        }
    }
    return rez;
}

// Functia PRINCIPALA de decompresie RLE
//cauta caracterul '#' inainte de a citi numarul de repetitii
//se reconstruieste sirul original din codul RLE.
function decompressRLE(text)
{
    let rez = "";
    const ESCAPE_CHAR = '#';

    for (let i = 0; i < text.length; i++)
    {
        let char = text[i];
        
        //se verifica daca caracterul urmator este separatorul nostru '#'
        if (text[i + 1] === ESCAPE_CHAR)
        {
            let nr = ""; 
            
            //sarim peste caracterul '#'
            let j = i + 2;
            
            //citim toate cifrele care urmeaza DUPA '#'
            while (j < text.length && text[j] >= '0' && text[j] <= '9')
            {
                nr += text[j];
                j++;
            }
            
            //am gasit un numar (ex: 4 din "F#4")
            if (nr !== "")
            {
                //repetam caracterul de nr ori.
                const repetitionCount = parseInt(nr);
                for (let k = 0; k < repetitionCount; k++)
                {
                    rez += char;
                }
                
                //mutam indexul i -> la pozitia de dupa ultimul numar citit (j-1).
                i = j - 1; 
            }
            else 
            {
                //gasim '#' dar nu urmeaza niciun numar
                //caracterul se considera ca fiind necodificat și trecem peste '#'
                rez += char;
                i++;
            }
        }
        else 
        {
            //daca nu urmeaza separatorul '#', caracterul se adauga o singura data 
            rez += char;
        }
    }

    return rez;
}

// INTERFATA


document.getElementById('compress-btn').onclick = function()
{
    // 1.se citeste textul introdus de utilizator
    let input = document.getElementById('input-text').value;
    
    // 2.apel functia de compresie RLE
    let output = compressRLE(input);
    
    // 3.afiseaza rezultatul (codul RLE) in caseta 'output-text'
    document.getElementById('output-text').value = output;
};


document.getElementById('decompress-btn').onclick = function()
{
    // 1.citeste string-ul codificat 
    let input = document.getElementById('input-text').value;
    
    // 2.apel functia de decompresie
    let output = decompressRLE(input);
    
    // 3.afiseaza string-ul original (decomprimat) 
    document.getElementById('output-text').value = output;
};