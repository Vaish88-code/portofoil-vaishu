import React from 'react';

const EmailSetup: React.FC = () => {
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
      <h4 className="font-semibold text-indigo-800 mb-2">📧 EmailJS Setup Instructions</h4>
      <p className="text-indigo-700 text-sm mb-3">
        To enable the contact form to send emails to vg2530774@gmail.com, follow these steps:
      </p>
      <ol className="text-indigo-700 text-sm space-y-2 ml-4 list-decimal">
        <li>Go to <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline font-medium">EmailJS.com</a> and create a free account</li>
        <li>Add a new email service:
          <ul className="ml-4 mt-1 space-y-1 list-disc">
            <li>Select Gmail as your service provider</li>
            <li>Connect your Gmail account (vg2530774@gmail.com)</li>
            <li>Name your service "service_gmail" (important for the code to work)</li>
          </ul>
        </li>
        <li>Create a new email template:
          <ul className="ml-4 mt-1 space-y-1 list-disc">
            <li>Name your template "template_contact" (important for the code to work)</li>
            <li>Add these variables in your template: <code>&#123;&#123;from_name&#125;&#125;</code>, <code>&#123;&#123;from_email&#125;&#125;</code>, <code>&#123;&#123;message&#125;&#125;</code>, <code>&#123;&#123;to_email&#125;&#125;</code></li>
            <li>Design your email template as desired</li>
          </ul>
        </li>
        <li>Get your Public Key from Account → API Keys</li>
        <li>Replace 'YOUR_PUBLIC_KEY' in App.tsx with your actual Public Key</li>
      </ol>
      <p className="text-indigo-700 text-sm mt-3 font-medium">
        Once completed, this form will send messages directly to vg2530774@gmail.com
      </p>
    </div>
  );
};

export default EmailSetup;