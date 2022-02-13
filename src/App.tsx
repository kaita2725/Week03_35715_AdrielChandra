import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { IonAlert, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput} from '@ionic/react';
import {useRef, useState} from "react";
import BmiControls from './components/BmiControls';
import InputControl from './components/InputControl';
import BmiResult from './components/BmiResult';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
// import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
      const [ calculatedBMI, setCalculatedBMI  ] = useState<number>();
      const [ bmi_criteria, setCriteriaResult  ] = useState<string>("Kriteria");
      const heightInputRef = useRef<HTMLIonInputElement>(null);
      const weightInputRef = useRef<HTMLIonInputElement>(null);
      const [error, setError ] = useState<string>();
      const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

      const calculateBMI = () => {
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;

        if(!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
          setError('Please enter a valid (non-negative) input number');
          return;
        }
        if(calcUnits === 'cmkg') {
          const bmi: number = +enteredWeight / ((+enteredHeight/100) * (+enteredHeight/100));
          setCalculatedBMI(bmi);
          setCriteriaResult(bmi_result(bmi));
        } else if (calcUnits === 'ftlbs') {
          const bmi: number = (+enteredWeight/2.2) / ((+enteredHeight/3.28) * (+enteredHeight/3.28));
          setCalculatedBMI(bmi);
          setCriteriaResult(bmi_result(bmi));
        }
      };

      const bmi_result = (bmi: number): string => {
        if(bmi <= 18.5) {return "kurus";}
        else if(bmi >= 18.5 && bmi <= 24.9) {return "Normal";}
        else if(bmi >= 25 && bmi <= 29.9) {return "Gemuk";}
        else if(bmi >= 30){return "Obesitas";}
        else {return "error"}
      }

      const resetAll = () => {
        heightInputRef.current!.value = " ";
        weightInputRef.current!.value = " ";
        setCalculatedBMI(0);
        setCriteriaResult("Kriteria")
      }

      const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
        setCalcUnits(selectedValue);
      };
      setupIonicReact();
  return (
    <>
    <IonAlert
      isOpen={!!error}
      message= {error}
      buttons={[
        {text: 'okay', handler: clearError => {
                console.log('Confirm k button');
              }}
    ]}
    />
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>

      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetAll}/>
          {(calculatedBMI !=null && calculatedBMI > 0) && (<IonRow>
            <IonCol>
              <BmiResult onCriteria={bmi_criteria} onCalculatedBMI={calculatedBMI}/>
            </IonCol>
          </IonRow>)}
        </IonGrid>
      </IonContent>
    </IonApp>
    </>
)
};
export default App;
