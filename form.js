// form.js
const handleSubmit = async (event) => {
  event.preventDefault();
  const name = event.target.name.value.trim(); 
  const address = event.target.address.value.trim(); 
  if (!name || !address) {
    console.error('Name and address are required.');
    return;
  }

  try {
      const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, address }), 
      });
      if (!response.ok) {
        const errorData = await response.text(); 
        console.error('Error:', errorData);
        return; 
    }

      const data = await response.json();
      if (response.ok) {
          console.log('Success:', data);
          event.target.reset();
      } else {
          console.error('Error:', data);
      }
  } catch (error) {
      console.error('Request failed:', error);
  }
};


const form = document.getElementById('registrationForm');
form.addEventListener('submit', handleSubmit);
