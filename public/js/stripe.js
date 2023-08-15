/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51Nf6e7JCnnjlxZG1waDPSXNHFU9cB2rgPSrAYzjuDNZYEGsFxC2uIMQpsQ8vxDld2dinv1OoKCUTOovVJt0KQYJP00kxK1nMOP'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get session from server
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout from + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
