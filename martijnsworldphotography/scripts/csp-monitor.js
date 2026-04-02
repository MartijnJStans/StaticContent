// Monitor CSP violations in production
document.addEventListener('securitypolicyviolation', function(e) {
    console.warn('CSP Violation:', {
        directive: e.violatedDirective,
        blockedURI: e.blockedURI,
        sourceFile: e.sourceFile,
        lineNumber: e.lineNumber,
        columnNumber: e.columnNumber,
        originalPolicy: e.originalPolicy
    });
    
    // Optional: Send to your logging service
    if (window.config && window.config.apiUrl) {
        fetch(window.config.apiUrl + '/csp-violations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                directive: e.violatedDirective,
                blockedURI: e.blockedURI,
                timestamp: new Date().toISOString()
            })
        }).catch(err => console.error('Failed to log CSP violation:', err));
    }
});
