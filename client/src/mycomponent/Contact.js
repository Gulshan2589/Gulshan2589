import React, { useEffect, useState} from "react";
import { useSpeechContext} from "@speechly/react-client";
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";

function Contact() {
  const { segment} = useSpeechContext();
  const initialState = {
    amount: '',
    category: '',
    type: ''
  };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'Expense' });
      }
      if (segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'Income' });
      }

      segment.entities.forEach((s) => {
        switch (s.type) {
          case 'amount':
            setFormData({ ...formData, amount: s.value });
            break;
          case 'category':
            setFormData({ ...formData, category: s.value});
            break;
          default:
            break;
        }
      });

      if (segment.isFinal && formData.amount && formData.category && formData.type) {
       console.log("right", segment.value)
      }
    }
  }, [segment]);
  return (
    <>
      <div className="contact">
        <div className="speech">
            <BigTranscript placement="bottom" />
            <PushToTalkButton placement="bottom" captureKey=" " />
            <IntroPopup />
        </div>
        <div className="container">
        <label  className="form-label">Expense</label>
          <input type="text" className="form-control" id="inputText" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}/>
          <label  className="form-label">Category</label>
          <input type="text" className="form-control" id="inputText" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}/>
          <label  className="form-label">Amount</label>
          <input type="text" className="form-control" id="inputText" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}/>
        </div>
      </div>
    </>
  );
}


export default Contact;