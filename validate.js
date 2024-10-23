"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function validateContactNumber(contactNumber) {
    const phoneRegex = /^([789]\d{9})$/; 
    return phoneRegex.test(contactNumber);
}
function validateForm(data) {
    if (!data.name || !data.email || !data.contactNumber || !data.subject || !data.message) {
        return "All fields are required.";
    }
    if (!validateContactNumber(data.contactNumber)) {
        return "Ivalid Phone Number.";
    }
    return null;
}
function handleSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('e-mail').value,
            contactNumber: document.getElementById('contact-number').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        const validationError = validateForm(formData);
        if (validationError) {
            alert(validationError);
            return;
        }
        const apiURL = "https://67186a18b910c6a6e02c02d3.mockapi.io/form"; // Correct the endpoint
        try {
            const response = yield fetch(apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Submission Failed");
            }
            alert("Form Submitted Successfully");
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
            else {
                alert("An unknown error occurred");
            }
        }
    });
}
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', handleSubmit);
}
