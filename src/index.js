import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router} from 'react-router-dom'
import App from './2-routes/0-app/app';

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';

import { UserProvider } from './3-context/0-user.context';
import { AuthenticationProvider } from './3-context/1-authentication.context';
import { PaymentProvider } from './3-context/2-payment.context';
import { AnalyseProvider } from './3-context/3-analyse.context';
import { RequestProvider } from './3-context/4-request.context';
import { SelectProvider } from './3-context/5-select.context';
import { AudioProvider } from './3-context/6-audio.context';
import { MathProvider } from './3-context/7-math.context';

const stripePromise = loadStripe('pk_test_51OwPy8D35M2RKGuKnwIf51ejBGxmqOroIX1g17m7VUzfU0XSELnNWClr99CTQI0P0Z2l2CJaryrfMFjQnFgwuC54005Hs2vdIo');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <AuthenticationProvider>
          <PaymentProvider>
            <AnalyseProvider>
              <MathProvider>
                <RequestProvider>
                  <SelectProvider>
                    <AudioProvider>
                      <Elements stripe={stripePromise}>
                        <App />
                      </Elements>
                    </AudioProvider>
                  </SelectProvider>     
                </RequestProvider>
              </MathProvider>
            </AnalyseProvider>
          </PaymentProvider>
        </AuthenticationProvider>
      </UserProvider>
    </Router>
  </React.StrictMode> 
);