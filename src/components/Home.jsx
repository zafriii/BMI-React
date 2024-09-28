import React, { useState } from 'react';
import './home.css';
import Greeting from './Greeting';
import Modal from './Modal'; 

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: ''
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [bmi, setBmi] = useState(null);
  const [healthMessage, setHealthMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const heightInMeters = formData.height / 100; 
    const bmi = formData.weight / (heightInMeters * heightInMeters);
    //const bmiScaled = Math.round(bmi * 1000); 
    const bmiFormatted = bmi.toPrecision(6);;

    let healthMessage = '';
    if (bmiFormatted < 185000) {
      healthMessage = "Your BMI indicates that you are underweight. It's important to ensure you're getting enough nutrients.";
    } else if (bmiFormatted >= 185000 && bmiFormatted < 250000) {
      healthMessage = "Your BMI is within the healthy range. Keep up the good work with a balanced diet and regular exercise.";
    } else if (bmiFormatted >= 250000 && bmiFormatted < 300000) {
      healthMessage = "Your BMI indicates that you are overweight. Consider adjusting your diet and increasing physical activity.";
    } else {
      healthMessage = "Your BMI indicates obesity. Consult a healthcare professional for personalized advice and support.";
    }

    // setBmi(bmiScaled);
    setBmi(bmiFormatted);
    setHealthMessage(healthMessage);
    setModalOpen(true);

    setFormData({
      name: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
    });

    try {
      const response = await fetch('http://localhost/php/bmi.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="wrapper">
        
        <div className="hero_wrap">
          <div className="hero_intro">
            <Greeting />
            <h1>Body Mass<br />Index Calculator</h1>
            <p>
              Better understand your weight in relation to your height using our
              body mass index (BMI) calculator. While BMI is not the sole
              determinant of a healthy weight, it offers a valuable starting point
              to evaluate your overall health and well-being.
            </p>
          </div>
          <div className="bmi_calculator">
            <form onSubmit={handleSubmit}>
              <h3>Enter your details below</h3>

              <input
                type="text"
                id="name"
                name="name"
                placeholder='Enter your name'
                value={formData.name}
                onChange={handleChange}
                required
              /><br />

              <input
                type="number"
                id="age"
                name="age"
                placeholder='Enter your age'
                value={formData.age}
                onChange={handleChange}
                required
              /><br />

              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{ width: '230px' }}
                required
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select><br />

              <input
                type="number"
                id="height"
                name="height"
                placeholder='Enter your height (m)'
                value={formData.height}
                onChange={handleChange}
                step="0.01"
                min="0.01" 
                required
              /><br />

              <input
                type="number"
                id="weight"
                name="weight"
                placeholder='Enter your weight (kg)'
                value={formData.weight}
                onChange={handleChange}
                step="0.01"
                min="0.01" 
                required
              /><br />

              <button type="submit">Calculate</button>
            </form>
          </div>
        </div>

        <div className="means_wrap">
          <div className="img_wrap">
            <img
              src="images/eat.png"
              alt="man"
              width="564"
              height="533"
            />
          </div>
          <div className="means_text">
            
            <h1>What your BMI result means</h1>
            <p>
              A BMI range of 18.5(185000) to 24.9 is(250000) considered a 'healthy weight.'
              Maintaining a healthy weight may lower your chances of experiencing
              health issues later on, such as obesity and type 2 diabetes. Aim for
              a nutritious diet with reduced fat and sugar content, incorporating
              ample fruits and vegetables. Additionally, strive for regular
              physical activity, ideally about 30 minutes daily for five days a
              week.
            </p>
          </div>
        </div>
        <div className="bmi_components_wrap">
          <div className="component">
            <h3>Healthy eating</h3>
            <p>
              Healthy eating promotes weight control, disease prevention, better
              digestion, immunity, mental clarity, and mood.
            </p>
          </div>
          <div className="component">
            <h3>Regular exercise</h3>
            <p>
              Exercise improves fitness, aids weight control, elevates mood, and
              reduces disease risk, fostering wellness and longevity.
            </p>
          </div>
          <div className="component">
            <h3>Adequate sleep</h3>
            <p>
              Sleep enhances mental clarity, emotional stability, and physical
              wellness, promoting overall restoration and rejuvenation.
            </p>
          </div>
        </div>
        <div className="limitations_wrap">
          <div className="limotations_text">
            <h1>Limitations of BMI</h1>
            <p>
              Although BMI is often a practical indicator of healthy weight, it is
              not suited for every person. Specific groups should carefully
              consider their BMI outcomes, and in certain cases, the measurement
              may not be beneficial to use.
            </p>
            <img src="./images/pattern-curved-line-right.svg" alt="" />
          </div>
          <div className="blocks_limit">
            <div className="elements">
              <div className="important">
                <img src="./images/icon-gender.svg" alt="" />
                <h3>Gender</h3>
              </div>
              <p>
                The development and body fat composition of girls and boys vary
                with age. Consequently, a child's age and gender are considered
                when evaluating their BMI.
              </p>
            </div>
            <div className="elements">
              <div className="important">
                <img src="./images/icon-age.svg" alt="" />
                <h3>Age</h3>
              </div>
              <p>
                In aging individuals, increased body fat and muscle loss may cause
                BMI to underestimate body fat content.
              </p>
            </div>
            <div className="elements">
              <div className="important">
                <img src="./images/icon-muscle.svg" alt="" />
                <h3>Muscle</h3>
              </div>
              <p>
                BMI may misclassify muscular individuals as overweight or obese,
                as it doesn't differentiate muscle from fat.
              </p>
            </div>
            
            <div className="elements">
              <div className="important">
                <img src="./images/icon-race.svg" alt="" />
                <h3>Race</h3>
              </div>
              <p>
                Certain health concerns may affect individuals of some Black and
                Asian origins at lower BMIs than others. To learn more, it is
                advised to discuss this with your GP or practice nurse.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        bmi={bmi} 
        name={formData.name}
        healthMessage={healthMessage}
      />
    </>
  );
}

export default Home;
