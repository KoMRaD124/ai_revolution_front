"use client";

import { Loader, Message, MessageField } from "@/components/screens/conversations";
import { useGetMessageListQuery } from "@/redux/features/conversations/chatApiSlice";
import { selectCurrentChat, setCurrentChat } from "@/redux/features/conversations/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UUID } from "crypto";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import Template from "./Template";
import TemplateButton from "./TemplateButton";
import styles from "./style.module.scss"
import close from "@/public/close.svg"
import Image from "next/image";

export default function Chat({ id }: { id?: UUID }) {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector(selectCurrentChat);

  const { data: messagesList, isLoading } = useGetMessageListQuery({ id: id });
  const [message, setMessage] = useState("");
  const [templateShow, setTemplateShow] = useState(false);


  useEffect(() => {
    if (messagesList && !isEqual(messagesList, currentChat)) {
      dispatch(setCurrentChat(messagesList));
    }
  }, [messagesList, dispatch, currentChat]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleTemplateClick = (templateText: string) => {
    setMessage(templateText);
    setTemplateShow(false)

  };

  const handleButtonClick = () => {
    setTemplateShow(true)
    console.log("Button clicked!");
  };
  const templates = [
    {
      templateName: "РАЗНЫЕ ВИДЫ СЦЕНАРИЕВ",
      templateText:
        "Необходимо подготовить сценарий видео. Подскажи, какая информация тебе для этого понадобится списком? И как это будет выглядеть?"
    },
    {
      templateName: "CJM",
      templateText:
        "Подготовь пожалуйста CJM, указывая, какая информация тебе нужна, чтобы самостоятельно все заполнить и отдать готовый текст."
    },
    {
      templateName: "САММАРАЙЗИНГ",
      templateText:
        "Суммируй, пожалуйста, то, что мы обсуждали в простой и лаконичный текст так, чтобы читая его, человек не участвовавший в этой беседе, понял, о чем мы разговаривали;"
    },
    {
      templateName: "Перевод на маркетологический",
      templateText:
        "Чат, перепиши этот текст так, будто его написали маркетологи, используя все все правила маркетинга, которые существуют"
    },
    {
      templateName: "Язык команды Стива Джобса",
      templateText:
        "Если бы это описание сделали самые лучшие маркетологи компании Стива Джобса?"
    },
    {
      templateName: "Метод “Шести шляп”",
      templateText:
        "Чат, давай разберем какую-нибудь идею при помощи метода 'шести шляп' Эдвада ДеБоно. Подскажи, какая информация тебе от меня нужна, чтобы начать и как это будет выглядеть?"
    },
    {
      templateName: "Мыслительное путешествие",
      templateText:
        "Давай попробуем поискать новые идеи при помощи метода креативного латерального мышления 'Мыслительное путешествие'? Что от меня нужно и как это будет выглядеть?"
    },
    {
      templateName: "SCAMPER",
      templateText:
        "Я бы хотел воспользоваться методом латерального мышления 'SCAMPER', подскажи, какая тебе нужна информация, чтобы ты смог мне помочь, и как это будет выглядеть?"
    },
    {
      templateName: "Игровой подход",
      templateText:
        "А игровой подход в рамках латерального мышления мы можем с тобой здесь попробовать? Что для этого нужно от меня? и как это будет выглядеть?"
    },
    {
      templateName: "Реверсирование",
      templateText:
        "А реверсирование в рамках латерального мышления мы как-то можем здесь с тобой реализовать? Что для этого от меня нужно? И как это будет выглядеть?"
    }
  ];
  
  return (
    <div className="relative w-full h-full bg-bgchatmessage" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>


      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {(messagesList?.messages?.length ?? 0) === 0 ? (
            <div className='flex flex-col h-full w-full justify-center items-center text-center px-56 bg-bgchatmessage'>
              <h1 className='text-3xl font-bold text-texthover'>Приветствую!</h1>
              <p className='leading-normal text-muted-foreground py-10' style={{ width: "750px",   }}>
                Готова преобразить твои идеи в виртуальные истории. <br />
                Давай начнем прямо сейчас!
              </p>
              {/* <div className='flex justify-center items-center'>
             <GitHub className='mr-2' />
             <VKontakte className='mr-2' />
             <Google className='mr-2' />
             <EyeOpen className='mr-2' />
             <EyeClose className='mr-2' />
             <Book className='mr-2' />
             <XCircle className='mr-2' />
             <PauseCircle className='mr-2' />
             <Chat className='mr-2' />
             <LogOut className='mr-2' />
             <Plus className='mr-2' />
             <Send className='mr-2' />
             <Close className='mr-2' />
           </div> */}
            </div>
          ) : (
            <div ref={messagesContainerRef} className="" style={{ overflowY: "auto", maxHeight: "calc(100vh - 260px)", width: "750px", marginTop: "60px" }}>
              {messagesList?.messages?.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          )}
        </>

      )}


      <div className={styles.ChatTemplateButtonContainer}><div className={styles.ChatTemplateButtonContent}><TemplateButton onClick={handleButtonClick} /></div></div>

      <MessageField message={message} setMessage={setMessage} />

      <style jsx>{`
        ::-webkit-scrollbar {
          width: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #8d8d8d;
        }
      `}</style>
      {templateShow && (<div className={styles.TemplateContainer}><div className={styles.TemplateContent}> <div className="mb-4">
        <p className="text-texthover text-semibold text-lg pb-2" style={{ color: "#F6F6F6", fontSize: "32px", marginBottom: "40px" }}>
          Шаблоны
        </p>
        <div className="flex flex-wrap " style={{ maxWidth: "740px", }}>
          {templates.map((item, index) => (
            <div key={index} className="w-1/2" style={{ maxWidth: "50%", flexBasis: "50%", boxSizing: "border-box", marginLeft: 0 }}>
              <Template onClickTemplate={handleTemplateClick} templateText={item.templateText} templateName={item.templateName} />
            </div>
          ))}
        </div>
        <div className={styles.templateButtonClose} onClick={() => setTemplateShow(false)}><Image src={close} alt="close" /></div>
      </div></div></div>)}
      {/* <div className={styles.TemplateContainer}><div className={styles.TemplateContent}> <div className="mb-4">
        <p className="text-texthover text-semibold text-lg pb-2" style={{ color: "#F6F6F6", fontSize: "32px", marginBottom:"40px" }}>
          Шаблоны
        </p>
        <div className="flex flex-wrap " style={{ maxWidth: "740px",}}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-1/2" style={{ maxWidth: "50%", flexBasis: "50%", boxSizing: "border-box", marginLeft: 0 }}>
              <Template onClickTemplate={handleTemplateClick} templateText="Lorem ipsum dolor sit amet consectetur. Convallis risus arcu id accumsan massa sapien" />
            </div>
          ))}
        </div>
        <div className={styles.templateButtonClose}><Image src={close} alt="close"/></div>
      </div></div></div> */}
    </div>
  );
}