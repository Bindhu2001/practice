document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form-detail');
    const fname = document.querySelector('#fname');
    const lname = document.querySelector('#lname');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const mobile = document.querySelector('#mobile');
    const details = document.querySelector('#details');
    const resetButton = form.querySelector('button[type="reset"]');
    const errorDivs = form.querySelectorAll('.error');
    
    const clearErrors = () => {
        errorDivs.forEach(errorDiv => {
            errorDiv.textContent = '';
        });
    };

    const showError = (element, message) => {
        const errorDiv = element.closest('.input').querySelector('.error');
        errorDiv.textContent = message;
    };

    const isFirstCharCapital = (str) => {
        return str.charAt(0) === str.charAt(0).toUpperCase();
    };

    const validateFirstName = () => {
        if (fname.value.trim() === '') {
            showError(fname, 'First Name is required.');
        } else if (!isFirstCharCapital(fname.value.trim())) {
            showError(fname, 'First Name must start with a capital letter.');
        } else {
            showError(fname, ''); // Clear error
        }
    };

    const validateLastName = () => {
        if (lname.value.trim() === '') {
            showError(lname, 'Last Name is required.');
        } else if (!isFirstCharCapital(lname.value.trim())) {
            showError(lname, 'Last Name must start with a capital letter.');
        } else {
            showError(lname, ''); // Clear error
        }
    };

    const validateGender = () => {
        let genderSelected = false;
        genderInputs.forEach(input => {
            if (input.checked) {
                genderSelected = true;
            }
        });
        if (!genderSelected) {
            showError(genderInputs[0], 'Gender is required.');
        } else {
            showError(genderInputs[0], ''); // Clear error
        }
    };

    const validateMobile = () => {
        if (mobile.value.trim() === '' || !/^\d{10}$/.test(mobile.value.trim())) {
            showError(mobile, 'A valid 10-digit Mobile Number is required.');
        } else {
            showError(mobile, ''); // Clear error
        }
    };

    fname.addEventListener('input', validateFirstName);
    lname.addEventListener('input', validateLastName);
    genderInputs.forEach(input => input.addEventListener('change', validateGender));
    mobile.addEventListener('input', validateMobile);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors();

        validateFirstName();
        validateLastName();
        validateGender();
        validateMobile();

        let isValid = ![...errorDivs].some(errorDiv => errorDiv.textContent !== '');

        if (isValid) {
            let gender = '';
            genderInputs.forEach(input => {
                if (input.checked) {
                    gender = input.value;
                }
            });

            const fnameValue = fname.value;
            const lnameValue = lname.value;
            const mobileValue = mobile.value;
            details.style.backgroundColor = 'rgba(240, 255, 255, 0.9)';
            details.style.color  = '#093691'; 
            details.style.padding ='10px'
            details.innerHTML = `
                <p><u>Check the details:</u></p>
                <p>First Name: ${fnameValue}</p>
                <p>Last Name: ${lnameValue}</p>
                <p>Gender: ${gender}</p>
                <p>Mobile Number: ${mobileValue}</p>
            `;

            form.reset();
        }
    });

    resetButton.addEventListener('click', () => {
        details.innerHTML = ''; // Clear details
        details.style.backgroundColor = 'rgb(9, 54, 145)';
        clearErrors();
    });

    // Clear details on page load
    details.innerHTML = '';
    details.style.backgroundColor = 'rgb(9, 54, 145)';
});
