const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const doctors = [
  { id: 1, name: 'Dr. Devi', specialty: 'Cardiologist', appointments: [] },
  { id: 2, name: 'Dr. lalu', specialty: 'Dermatologist', appointments: [] },
  
];

const appointments = [];
app.get('/doctors', (req, res) => {
  res.json(doctors);
});

app.get('/doctors/:doctorId', (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  const doctor = doctors.find((doc) => doc.id === doctorId);
  if (!doctor) {
    res.status(404).json({ error: 'Doctor not found' });
  } else {
    res.json(doctor);
  }
});

app.post('/appointments', (req, res) => {
  const { doctorId, patientName, appointmentDate } = req.body;
  const doctor = doctors.find((doc) => doc.id === doctorId);
  if (!doctor) {
    res.status(404).json({ error: 'Doctor not found' });
    return;
  }

  const appointment = {
    doctorId: doctor.id,
    patientName,
    appointmentDate,
  };

  doctor.appointments.push(appointment);
  appointments.push(appointment);

  res.json({ message: 'Appointment booked successfully', appointment });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.delete('/appointments/:appointmentIndex', (req, res) => {
    const appointmentIndex = parseInt(req.params.appointmentIndex);
    if (isNaN(appointmentIndex) || appointmentIndex < 0 || appointmentIndex >= appointments.length) {
      res.status(400).json({ error: 'Invalid appointment index' });
      return;
    }
  
    const deletedAppointment = appointments.splice(appointmentIndex, 1)[0];
    res.json({ message: 'Appointment deleted successfully', appointment: deletedAppointment });
  });
  
