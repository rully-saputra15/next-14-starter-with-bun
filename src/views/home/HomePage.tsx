'use client';
import React from 'react';
import api from '@/api';
import { Spinner, Textarea } from '@nextui-org/react';
import { ChatHistory } from '@/types';

const HomePage = () => {
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedText, setGeneratedText] = React.useState<Array<ChatHistory>>(
    [],
  );

  const handleGenerateResponse = async () => {
    try {
      setIsLoading(true);
      const updatedGeneratedText = [...generatedText];
      updatedGeneratedText.push({ role: 'user', parts: [{ text: message }] });
      const res = await api.postMessage({
        newMessage: message,
        history: updatedGeneratedText,
      });
      const { message: result } = res.data;
      const cleanText = result.replaceAll('**', '</b>');
      setGeneratedText([
        ...updatedGeneratedText,
        { role: 'model', parts: [{ text: cleanText }] },
      ]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const handleKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter' && ev.shiftKey) return;
    if (ev.key === 'Enter') {
      ev.preventDefault();
      handleGenerateResponse();
    }
  };

  return (
    <section className="flex flex-col justify-between items-start gap-3 h-full">
      <h1 className="font-black text-xl">Generative AI by Rully Saputra</h1>
      <div className="grow">
        {generatedText.map((text, index) => {
          return (
            <>
              <small>{text.role}</small>
              <p
                style={{ whiteSpace: 'pre-line' }}
                key={index}
                dangerouslySetInnerHTML={{ __html: text.parts[0].text }}
              ></p>
            </>
          );
        })}
        {isLoading && <Spinner />}
      </div>
      <Textarea
        placeholder="What Do you Think ?"
        value={message}
        onChange={(ev) => setMessage(ev.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
    </section>
  );
};

export default HomePage;
