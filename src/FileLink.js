import React, { useCallback } from 'react';

function FileLink({ textId, text, className }) {
    console.log(textId)

    const handleClick = useCallback(async () => {

        try {
            const response = await fetch(`https://r2-sham.amusto.workers.dev/${textId}.json`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `${textId}.json`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else if (response.status === 404) {
                console.log('File not found');
            } else {
                console.log('An error occurred while downloading the file');
            }
        } catch {
            console.log('Network error');
        }
    }, [textId]);

    return (
        <div>
            <button className={`text-button ${className}`} onClick={handleClick}>{text}</button>
        </div>
    );
}

export default FileLink;