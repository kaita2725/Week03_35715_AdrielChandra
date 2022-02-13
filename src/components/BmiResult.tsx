import React from 'react';
import {IonCard, IonCardTitle, IonCardContent} from "@ionic/react";

const BmiResult: React.FC <{onCriteria: string ; onCalculatedBMI: number}> = props => {

  return (
    <IonCard>
      <IonCardTitle className="ion-text-center">
      {props.onCriteria}
      </IonCardTitle>
      <IonCardContent className="ion-text-center">
        <h2>{props.onCalculatedBMI}</h2>
      </IonCardContent>
    </IonCard>
  );
};
export default BmiResult;
