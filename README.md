# Клиентская часть веб-приложения для проведения экспертизы на проектных конкурсах

[Ссылка на репозиторий с серверной частью](https://github.com/Sad-Programmist/Expertise-Server)

## Описание веб-приложения
Данное веб-приложение позволяет проводить экспертизу работ на проектных конкурсах. В системе есть 2 типа пользователей: эксперты и организаторы. Эксперты составляют экспертные заключения, 
организаторы добавляют всю необходимую информацию для проведения экспертизы и просматривают рейтинг работ.

## Задача веб-приложения 
Сбор экспертных заключений и автоматическое составление рейтинга проектов на их основе

## Основные функции
Пользователи с ролью "Эксперт" имеют возможность:
* Выполнить вход в систему;
* Добавлять, изменять и просматривать экспертные заключения;
* Просматривать таблицу с краткими экспертными заключениями по всем проектам.

Пользователи с ролью "Организатор" имеют возможность:
* Выполнить вход в систему;
* Редактировать проекты;
* Редактировать экспертов;
* Редактировать организаторов;
* Редактировать таблицу с критериями;
* Просматривать экспертные заключения;
* Просматривать таблицу с рейтингом проектов;
* Скачать электронную таблицу с детализированным рейтингом проектов.

## Архитектура
Клиентская часть разработана в соответствии с компонентой архитектурой. Основными компонентами интерфейса являются:
* Header - панель навигации;
* Table - таблица;
* Form - форма.  

Форма является крупным и законченным компонентом для решения определенной задачи. Например, AddProjectForm позволяет добавить новый проект в систему.
Формы в свою очередь состоят из следующих компонентов:
* Input - поле ввода;
* Button - кнопка;
* Select - выпадающий список.

## Принципы проведения экспертизы
Экспертное заключения состоит из следующих частей:
* Таблица с критериями;
* Текстовый отзыв;
* Итоговый вывод о работе (заслуживает поддержку/не заслуживает поддержки).  

Итоговая оценка по проекту рассчитывается как сумма всех выставленных экспертами оценок.
