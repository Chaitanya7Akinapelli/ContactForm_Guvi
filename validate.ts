interface ContactFormData {
    name: string;
    email: string;
    contactNumber: string;
    subject: string;
    message: string;
}

function validateContactNumber(contactNumber: string): boolean {
    const phoneRegex = /^([789]\d{9})$/;
    return phoneRegex.test(contactNumber);
}

function validateForm(data: ContactFormData): string | null {
    if (!data.name || !data.email || !data.contactNumber || !data.subject || !data.message) {
        return "All fields are required.";
    }
    if (!validateContactNumber(data.contactNumber)) {
        return "Ivalid Phone Number.";
    }
    return null;
}

async function handleSubmit(event: Event) {
    event.preventDefault();

    const formData: ContactFormData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('e-mail') as HTMLInputElement).value,
        contactNumber: (document.getElementById('contact-number') as HTMLInputElement).value,
        subject: (document.getElementById('subject') as HTMLInputElement).value,
        message: (document.getElementById('message') as HTMLInputElement).value
    };

    const validationError = validateForm(formData);
    if (validationError) {
        alert(validationError);
        return;
    }

    const apiURL = "https://67186a18b910c6a6e02c02d3.mockapi.io/form";

    try {
        const response = await fetch(apiURL, {
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
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert("An unknown error occurred");
        }
    }
}
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', handleSubmit);
}
