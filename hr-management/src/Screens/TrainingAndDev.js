import React, { useState } from "react";
function TrainingAndDev() {
  const [show, setshow] = useState("Html");
  return (
    <div className="h-100" style={{ overflowY: "auto" }}>
      <div className="pt-10">
        <div
          className="d-flex justify-content-between"
          style={{ wordWrap: "break-word" }}
        >
          <div
            className={show === "Html" ? "training" : "trainingbtn"}
            onClick={() => setshow("Html")}
          >
            HTML
          </div>
          <div
            className={show === "Css" ? "training" : "trainingbtn"}
            onClick={() => setshow("Css")}
          >
            CSS
          </div>
          <div
            className={show === "Js" ? "training" : "trainingbtn"}
            onClick={() => setshow("Js")}
          >
            JavaScript
          </div>
          <div
            className={show === "Python" ? "training" : "trainingbtn"}
            onClick={() => setshow("Python")}
          >
            Python
          </div>
          <div
            className={show === "Java" ? "training" : "trainingbtn"}
            onClick={() => setshow("Java")}
          >
            Java
          </div>
          <div
            className={show === "C" ? "training" : "trainingbtn"}
            onClick={() => setshow("C")}
          >
            C
          </div>
          <div
            className={show === "C++" ? "training" : "trainingbtn"}
            onClick={() => setshow("C++")}
          >
            C++
          </div>
          <div
            className={show === "SQL" ? "training" : "trainingbtn"}
            onClick={() => setshow("SQL")}
          >
            SQL
          </div>
          <div
            className={show === "React" ? "training" : "trainingbtn"}
            onClick={() => setshow("React")}
          >
            react
          </div>
          <div
            className={show === "PHP" ? "training" : "trainingbtn"}
            onClick={() => setshow("PHP")}
          >
            PHP
          </div>
        </div>
      </div>
      <div>
        {show === "Html" ? (
          <div className="pt-20 px-2">
            <h5>What is HTML?</h5>
            {"\u2022"} HTML stands for Hyper Text Markup Language
            <br />
            {"\u2022"} HTML is the standard markup language for creating Web
            pages
            <br />
            {"\u2022"} HTML describes the structure of a Web page
            <br />
            {"\u2022"} HTML consists of a series of elements
            <br />
            {"\u2022"} HTML elements tell the browser how to display the content
            <br />
            {"\u2022"} HTML elements label pieces of content such as "this is a
            heading", "this is a paragraph", "this is a link", etc.
            <h5 className="pt-10"> How to View HTML Source</h5>
            Have you ever seen a Web page and wondered "Hey! How did they do
            that?"
            <h5 className="pt-10">View HTML Source Code:</h5>
            {"   "} Click CTRL + U in an HTML page, or right-click on the page
            and select "View Page Source". This will open a new tab containing
            the HTML source code of the page.
            <h5 className="pt-10">Inspect an HTML Element:</h5>
            <span>
              {"   "}Right-click on an element (or a blank area), and choose
              "Inspect" to see what elements are made up of (you will see both
              the HTML and the CSS). You can also edit the HTML or CSS
              on-the-fly in the Elements or Styles panel that opens.
            </span>
            <h5 className="pt-10">HTML Display</h5>
            {"\u2022"} You cannot be sure how HTML will be displayed.
            <br />
            {"\u2022"} Large or small screens, and resized windows will create
            different results.
            <br />
            {"\u2022"} With HTML, you cannot change the display by adding extra
            spaces or extra lines in your HTML code.
            <br />
            {"\u2022"} The browser will automatically remove any extra spaces
            and lines when the page is displayed:
            <div className="pt-10">
              For more content click on this link{" "}
              <a
                href="
            https://www.w3schools.com/html/default.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/html/default.asp
              </a>
            </div>
          </div>
        ) : show === "Css" ? (
          <div className="pt-20 h-100 px-2">
            <h4>What is CSS?</h4>
            {"\u2022"} CSS stands for Cascading Style Sheets
            <br />
            {"\u2022"} CSS describes how HTML elements are to be displayed on
            screen, paper, or in other media
            <br />
            {"\u2022"} CSS saves a lot of work. It can control the layout of
            multiple web pages all at once
            <br />
            {"\u2022"} External stylesheets are stored in CSS files
            <br />
            A CSS rule consists of a selector and a declaration block.
            <br />
            {"\u2022"} p is a selector in CSS (it points to the HTML element you
            want to style: p).
            <br />
            {"\u2022"} color is a property, and red is the property value
            <br />
            {"\u2022"} text-align is a property, and center is the property
            value
            <br />
            <h4 className="pt-10">CSS Selectors</h4>
            CSS selectors are used to "find" (or select) the HTML elements you
            want to style.
            <br />
            We can divide CSS selectors into five categories:
            <br />
            {"\u2022"} Simple selectors (select elements based on name, id,
            class)
            <br />
            {"\u2022"} Combinator selectors (select elements based on a specific
            relationship between them)
            <br />
            {"\u2022"} Pseudo-class selectors (select elements based on a
            certain state)
            <br />
            {"\u2022"} Pseudo-elements selectors (select and style a part of an
            element)
            <br />
            {"\u2022"} Attribute selectors (select elements based on an
            attribute or attribute value)
            <br />
            <div className="pt-20">
              For more content click on this link{" "}
              <a
                href="https://www.w3schools.com/css/css_intro.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/css/css_intro.asp
              </a>
            </div>
          </div>
        ) : show === "Js" ? (
          <div className="pt-20 px-2">
            <h4>Why Study JavaScript?</h4>
            JavaScript is one of the 3 languages all web developers must learn:
            <br />
            1. HTML to define the content of web pages
            <br />
            2. CSS to specify the layout of web pages
            <br />
            3. JavaScript to program the behavior of web pages
            <br />
            <h4 className="pt-10">JavaScript Can Change HTML Content</h4>
            One of many JavaScript HTML methods is getElementById().
            <br />
            The example below "finds" an HTML element (with id="demo"), and
            changes the element content (innerHTML) to "Hello JavaScript":
            <br />
            Example
            <br />
            document.getElementById("demo").innerHTML = "Hello JavaScript";
            <br />
            <h4 className="pt-10">JavaScript Functions and Events</h4>
            A JavaScript function is a block of JavaScript code, that can be
            executed when "called" for.
            <br />
            For example, a function can be called when an event occurs, like
            when the user clicks a div.
            <br />
            <h4 className="pt-10">JavaScript Display Possibilities</h4>
            {"\u2022"} JavaScript can "display" data in different ways:
            <br />
            {"\u2022"} Writing into an HTML element, using innerHTML.
            <br />
            {"\u2022"} Writing into the HTML output using document.write().
            <br />
            {"\u2022"} Writing into an alert box, using window.alert().
            <br />
            {"\u2022"} Writing into the browser console, using console.log().
            <br />
            <div className="pt-10">
              For more content click on this link{" "}
              <a
                href="https://www.w3schools.com/js/js_intro.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/js/js_intro.asp
              </a>
            </div>
          </div>
        ) : show === "Python" ? (
          <div className="pt-20 h-90 px-2">
            <h4>What is Python?</h4>
            Python is a popular programming language. It was created by Guido
            van Rossum, and released in 1991.
            <br />
            It is used for:
            <br />
            {"\u2022"} web development (server-side),
            <br />
            {"\u2022"} software development,
            <br />
            {"\u2022"} mathematics,
            <br />
            {"\u2022"} system scripting.
            <br />
            <h4 className="pt-10">What can Python do?</h4>
            {"\u2022"} Python can be used on a server to create web
            applications.
            <br />
            {"\u2022"} Python can be used alongside software to create
            workflows.
            <br />
            {"\u2022"} Python can connect to database systems. It can also read
            and modify files.
            <br />
            {"\u2022"} Python can be used to handle big data and perform complex
            mathematics.
            <br />
            {"\u2022"} Python can be used for rapid prototyping, or for
            production-ready software development.
            <br />
            <h4 className="pt-10">Why Python?</h4>
            {"\u2022"} Python works on different platforms (Windows, Mac, Linux,
            Raspberry Pi, etc).
            <br />
            {"\u2022"} Python has a simple syntax similar to the English
            language.
            <br />
            {"\u2022"} Python has syntax that allows developers to write
            programs with fewer lines than some other programming languages.
            <br />
            {"\u2022"} Python runs on an interpreter system, meaning that code
            can be executed as soon as it is written. This means that
            prototyping can be very quick.
            <br />
            {"\u2022"} Python can be treated in a procedural way, an
            object-oriented way or a functional way.
            <br />
            <div className="pt-20">
              For more content click on this link{" "}
              <a
                href="https://www.w3schools.com/python/python_intro.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/python/python_intro.asp
              </a>
            </div>
          </div>
        ) : show === "Java" ? (
          <div className="pt-20 px-2">
            <h4> What is Java?</h4>
            Java is a popular programming language, created in 1995.
            <br />
            It is owned by Oracle, and more than 3 billion devices run Java.
            <br />
            It is used for:
            <br />
            {"\u2022"} Mobile applications (specially Android apps)
            <br />
            {"\u2022"} Desktop applications
            <br />
            {"\u2022"} Web applications
            <br />
            {"\u2022"} Web servers and application servers
            <br />
            {"\u2022"} Games
            <br />
            {"\u2022"} Database connection
            <br />
            And much, much more!
            <br />
            <h4 className="pt-10">Why Use Java?</h4>
            {"\u2022"} Java works on different platforms (Windows, Mac, Linux,
            Raspberry Pi, etc.)
            <br />
            {"\u2022"} It is one of the most popular programming language in the
            world
            <br />
            {"\u2022"} It has a large demand in the current job market
            <br />
            {"\u2022"} It is easy to learn and simple to use
            <br />
            {"\u2022"} It is open-source and free
            <br />
            {"\u2022"} It is secure, fast and powerful
            <br />
            {"\u2022"} It has a huge community support (tens of millions of
            developers)
            <br />
            {"\u2022"} Java is an object oriented language which gives a clear
            structure to programs and allows code to be reused, lowering
            development costs
            <br />
            {"\u2022"} As Java is close to C++ and C#, it makes it easy for
            programmers to switch to Java or vice versa
            <br />
            <div className="pt-10">
              For more content click on this link{" "}
              <a
                href="https://www.w3schools.com/java/default.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/java/default.asp
              </a>
            </div>
          </div>
        ) : show === "C" ? (
          <div className="pt-20 px-2">
            <h4 className="pt-10">What is C?</h4>
            {"\u2022"} C is a general-purpose programming language created by
            Dennis Ritchie at the Bell Laboratories in 1972.
            <br />
            {"\u2022"} It is a very popular language, despite being old. The
            main reason for its popularity is because it is a fundamental
            language in the field of computer science.
            <br />
            {"\u2022"} C is strongly associated with UNIX, as it was developed
            to write the UNIX operating system.
            <br />
            <h4 className="pt-10">Why Learn C?</h4>
            {"\u2022"} It is one of the most popular programming language in the
            world
            <br />
            {"\u2022"} If you know C, you will have no problem learning other
            popular programming languages such as Java, Python, C++, C#, etc, as
            the syntax is similar
            <br />
            {"\u2022"} C is very fast, compared to other programming languages,
            like Java and Python
            <br />
            {"\u2022"} C is very versatile; it can be used in both applications
            and technologies
            <br />
            <h4 className="pt-10">Difference between C and C++</h4>
            {"\u2022"} C++ was developed as an extension of C, and both
            languages have almost the same syntax
            <br />
            {"\u2022"} The main difference between C and C++ is that C++ support
            classes and objects, while C does not
            <div className="pt-20">
              For more content click on this link{" "}
              <a
                href="https://www.w3schools.com/c/index.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/c/index.php
              </a>
            </div>
          </div>
        ) : show === "C++" ? (
          <div className="pt-20 px-2">
            <h4>What is C++?</h4>
            {"\u2022"} C++ is a cross-platform language that can be used to
            create high-performance applications.
            <br />
            {"\u2022"} C++ was developed by Bjarne Stroustrup, as an extension
            to the C language.
            <br />
            {"\u2022"} C++ gives programmers a high level of control over system
            resources and memory.
            <br />
            {"\u2022"} The language was updated 4 major times in 2011, 2014,
            2017, and 2020 to C++11, C++14, C++17, C++20.
            <br />
            <h4 className="pt-10">Why Use C++</h4>
            {"\u2022"} C++ is one of the world's most popular programming
            languages.
            <br />
            {"\u2022"} C++ can be found in today's operating systems, Graphical
            User Interfaces, and embedded systems.
            <br />
            {"\u2022"} C++ is an object-oriented programming language which
            gives a clear structure to programs and allows code to be reused,
            lowering development costs.
            <br />
            {"\u2022"} C++ is portable and can be used to develop applications
            that can be adapted to multiple platforms.
            <br />
            {"\u2022"} C++ is fun and easy to learn!
            <br />
            {"\u2022"} As C++ is close to C, C# and Java, it makes it easy for
            programmers to switch to C++ or vice versa.
            <br />
            <h4 className="pt-10">Difference between C and C++</h4>
            {"\u2022"} C++ was developed as an extension of C, and both
            languages have almost the same syntax.
            <br />
            {"\u2022"} The main difference between C and C++ is that C++ support
            classes and objects, while C does not.
            <br />
            <h4 className="pt-10">C++ Install IDE</h4>
            {"\u2022"} An IDE (Integrated Development Environment) is used to
            edit AND compile the code.
            <br />
            {"\u2022"} Popular IDE's include Code::Blocks, Eclipse, and Visual
            Studio. These are all free, and they can be used to both edit and
            debug C++ code.
            <br />
            {"\u2022"} Note: Web-based IDE's can work as well, but functionality
            is limited.
            <br />
            <div className="pt-10">
              For more content click on this link{" "}
              <a
                href="https://www.w3schools.com/cpp/default.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/cpp/default.asp
              </a>
            </div>
          </div>
        ) : show === "SQL" ? (
          <div className="pt-20 px-2">
            <h4> What is SQL?</h4>
            {"\u2022"} SQL stands for Structured Query Language
            <br />
            {"\u2022"} SQL lets you access and manipulate databases
            <br />
            {"\u2022"} SQL became a standard of the American National Standards
            Institute (ANSI) in 1986, and of the International Organization for
            Standardization (ISO) in 1987
            <br />
            <h4>What Can SQL do?</h4>
            {"\u2022"} SQL can execute queries against a database
            <br />
            {"\u2022"} SQL can retrieve data from a database
            <br />
            {"\u2022"} SQL can insert records in a database
            <br />
            {"\u2022"} SQL can update records in a database
            <br />
            {"\u2022"} SQL can delete records from a database
            <br />
            {"\u2022"} SQL can create new databases
            <br />
            {"\u2022"} SQL can create new tables in a <br />
            {"\u2022"} SQL can create stored procedures in a database
            <br />
            {"\u2022"} SQL can create views in a database
            <br />
            {"\u2022"} SQL can set permissions on tables, procedures, and views
            <br />
            {"\u2022"} SQL is a Standard - BUT....
            <br />
            Using SQL in Your Web Site
            <br />
            {"\u2022"} To build a web site that shows data from a database, you
            will need:
            <br />
            {"\u2022"} An RDBMS database program (i.e. MS Access, SQL Server,
            MySQL)
            <br />
            {"\u2022"} To use a server-side scripting language, like PHP or ASP
            <br />
            {"\u2022"} To use SQL to get the data you want
            <br />
            {"\u2022"} To use HTML / CSS to style the page
            <br />
            <div className="">
              For more content click on this link{" "}
              <a
                href="https://www.w3schools.com/sql/default.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/sql/default.asp
              </a>
            </div>
          </div>
        ) : show === "React" ? (
          <div className="pt-20 px-2">
            <h4>What is React?</h4>
            React, sometimes referred to as a frontend JavaScript framework, is
            a JavaScript library created by Facebook.
            <br />
            React is a tool for building UI components.
            <br />
            <h4 className="pt-10">How does React Work?</h4>
            React creates a VIRTUAL DOM in memory.
            <br />
            Instead of manipulating the browser's DOM directly, React creates a
            virtual DOM in memory, where it does all the necessary manipulating,
            before making the changes in the browser DOM.
            <br />
            React only changes what needs to be changed!
            <br />
            React finds out what changes have been made, and changes only what
            needs to be changed.
            <br />
            <h4 className="pt-10">React.JS History</h4>
            Current version of React.JS is V18.0.0 (April 2022).
            <br />
            Initial Release to the Public (V0.3.0) was in July 2013.
            <br />
            React.JS was first used in 2011 for Facebook's Newsfeed feature.
            <br />
            Facebook Software Engineer, Jordan Walke, created it.
            <br />
            Current version of create-react-app is v5.0.1 (April 2022).
            <br />
            create-react-app includes built tools such as webpack, Babel, and
            ESLint.
            <br />
            <div className="pt-20">
              For more content click on this link{" "}
              <a
                href="https://www.w3schools.com/react/default.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/react/default.asp
              </a>
            </div>
          </div>
        ) : (
          <div className="pt-20 px-2">
            <h4>What is PHP?</h4>
            {"\u2022"} PHP is an acronym for "PHP: Hypertext Preprocessor"
            <br />
            {"\u2022"} PHP is a widely-used, open source scripting language
            <br />
            {"\u2022"} PHP scripts are executed on the server
            <br />
            {"\u2022"} PHP is free to download and use
            <br />
            {"\u2022"} PHP is an amazing and popular language!
            <br />
            {"\u2022"} It is powerful enough to be at the core of the biggest
            blogging system on the web (WordPress)!
            <br />
            {"\u2022"} It is deep enough to run large social networks!
            <br />
            {"\u2022"} It is also easy enough to be a beginner's first server
            side language!
            <br />
            <h4 className="pt-10">What is a PHP File?</h4>
            {"\u2022"} PHP files can contain text, HTML, CSS, JavaScript, and
            PHP code
            <br />
            {"\u2022"} PHP code is executed on the server, and the result is
            returned to the browser as plain HTML
            <br />
            {"\u2022"} PHP files have extension ".php"
            <br />
            <h4 className="pt-10">What Can PHP Do?</h4>
            {"\u2022"} PHP can generate dynamic page content
            <br />
            {"\u2022"} PHP can create, open, read, write, delete, and close
            files on the server
            <br />
            {"\u2022"} PHP can collect form data
            <br />
            {"\u2022"} PHP can send and receive cookies
            <br />
            {"\u2022"} PHP can add, delete, modify data in your database
            <br />
            <div className="pt-10">
              For more content click on this link{" "}
              <a
                href="https://www.w3schools.com/php/default.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.w3schools.com/php/default.asp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainingAndDev;
