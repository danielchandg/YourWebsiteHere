import * as React from 'react';
import { Accordion, AccordionSummary, Alert, AppBar, Avatar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Snackbar, Toolbar, Tooltip, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WebIcon from '@mui/icons-material/Web';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MessageIcon from '@mui/icons-material/Message';
import Home from './Home';
import Employees from './Employees';
import Paperwork from './Paperwork';
import Messages from './Messages';
import useScrollBlock from './useScrollBlock';
import { amber, yellow, cyan, indigo, lime, purple, teal, pink } from '@mui/material/colors';

// const starter_frontend = {name: 'Fiona', cost: 0, profit: 3, color: 'blue', frontend: true};
// const starter_backend = {name: 'Brandon', cost: 0, profit: 5, color: 'green'};

// const starter_project1 = {name: 'First Website', icon: 0, iconColor: 'blue', frontend: [0,100], backend: [0,120], money: 800};
// const starter_project2 = {name: 'Second Website', icon: 1, iconColor: 'green', frontend: [0,60], backend: [0,75], money: 650};

// const project7 = {name: 'Website 343', color: amber['A200'], icon: 0, iconColor: 'blue', frontend: [100,1000], backend: [200,2000], currentLOC: 5};
// const project2 = {name: 'Google', color: yellow[500], icon: 1, iconColor: 'purple', frontend: [6,10], backend: [8,20], maxEmployees: 3};
// const project3 = {name: 'Website 3', color: cyan['A200'], icon: 2, iconColor: 'green',  frontend: [0,200], backend: [0,300], money: 2500};
// const project4 = {name: 'Website 4', color: indigo[100], icon: 3, frontend: [0,500], backend: [0,750], futureLOC: 3};
// const project5 = {name: 'Website 5', color: lime['A400'], icon: 4, frontend: [0,666], backend: [0,777], employee: {name: 'I am special'}};
// const project6 = {name: 'Maple Story 1', color: purple['A400'], icon: 5, frontend: [0,1100], backend: [0,1150], project: {name: 'Maple Story 2', color: purple['A400'], icon: 6, frontend: [0,1150], backend: [0,1200], money: 3500}};
// {number: number, cost: cost, profit: profit, color: color}

export default function App() {

  // localStorage.clear();

  const [brightnessMode, setBrightnessMode] = React.useState('light');
  const [colorTheme, setColorTheme] = React.useState('blue');
  const [myColors] = React.useState({
    blue: 'rgb(25, 118, 210)',
    purple: 'rgb(156, 39, 176)',
    green: 'rgb(46, 125, 50)',
    orange: 'rgb(237, 108, 2)',
    red: 'rgb(211, 47, 47)'
  });

  const [messages, setMessages] = React.useState(JSON.parse(localStorage.getItem('messages') || '[]'));
  React.useEffect(() => localStorage.setItem('messages', JSON.stringify(messages)), [messages]);
  const [openMessages, setOpenMessages] = React.useState(false);
  const addM = async (m) => {
    setMessages([...messages, m]);
    setOpenMessages(true);
  }
  const [story, setStory] = React.useState(parseInt(localStorage.getItem('story') || '0'));
  React.useEffect(() => localStorage.setItem('story', story), [story]);
  const START = 16;

  const [projectColors] = React.useState([amber['A200'], yellow[500], cyan['A200'], indigo[100], lime['A400'], purple['A400'], teal['A200'], pink['A200']]);

  // speed = 1000 --> 1 second between hours
  const [speed] = React.useState(400);

  const [view, setView] = React.useState('home');
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [snackbarSuccessMsg, setSnackbarSuccessMsg] = React.useState('');

  // Home
  const MAX_PROJECTS = 8;
  const [money, setMoney] = React.useState(parseInt(localStorage.getItem('money') || '1000'));
  React.useEffect(() => localStorage.setItem('money', money), [money]);
  const [time, setTime] = React.useState(0);
  const [globalTime, setGlobalTime] = React.useState(0);
  const [day, setDay] = React.useState(parseInt(localStorage.getItem('day') || '0'));
  React.useEffect(() => localStorage.setItem('day', day), [day]);
  const [hour, setHour] = React.useState(parseInt(localStorage.getItem('hour') || '0'));
  React.useEffect(() => localStorage.setItem('hour', hour), [hour]);
  const [totalLOC, setTotalLOC] = React.useState(parseInt(localStorage.getItem('totalLOC') || '0'));
  React.useEffect(() => localStorage.setItem('totalLOC', totalLOC), [totalLOC]);
  const [totalProjects, setTotalProjects] = React.useState(parseInt(localStorage.getItem('totalProjects') || '0'));
  React.useEffect(() => localStorage.setItem('totalProjects', totalProjects), [totalProjects]);
  const [totalPapers, setTotalPapers] = React.useState(parseInt(localStorage.getItem('totalPapers') || '0'));
  React.useEffect(() => localStorage.setItem('totalPapers', totalPapers), [totalPapers]);
  const [currentProject, setCurrentProject] = React.useState(localStorage.getItem('currentProject') ? localStorage.getItem('currentProject') === 'null' ? null : JSON.parse(localStorage.getItem('currentProject')) : null);
  React.useEffect(() => {
    if (currentProject) localStorage.setItem('currentProject', JSON.stringify(currentProject));
    else localStorage.setItem('currentProject', 'null');
  }, [currentProject]);
  const [specialProjectTimer, setSpecialProjectTimer] = React.useState(4);
  const [projects, setProjects] = React.useState(JSON.parse(localStorage.getItem('projects') || '[]'));
  React.useEffect(() => localStorage.setItem('projects', JSON.stringify(projects)), [projects]);
  const [starterProject, setStarterProject] = React.useState(parseInt(localStorage.getItem('starterProject') || '0'));
  React.useEffect(() => localStorage.setItem('starterProject', starterProject), [starterProject]);
  const [createProject, setCreateProject] = React.useState(false);

  // Employees
  const [employees, setEmployees] = React.useState(JSON.parse(localStorage.getItem('employees') || '[]'));
  React.useEffect(() => localStorage.setItem('employees', JSON.stringify(employees)), [employees]);
  const [starterEmployees, setStarterEmployees] = React.useState(parseInt(localStorage.getItem('starterEmployees') || '0'));
  React.useEffect(() => localStorage.setItem('starterEmployees', starterEmployees), [starterEmployees]);
  const [maxEmployees, setMaxEmployees] = React.useState(parseInt(localStorage.getItem('maxEmployees') || '1'));
  React.useEffect(() => localStorage.setItem('maxEmployees', maxEmployees), [maxEmployees]);
  const [numEmployees, setNumEmployees] = React.useState(0);
  const [numFrontend, setNumFrontend] = React.useState(parseInt(localStorage.getItem('numFrontend') || '0'));
  React.useEffect(() => localStorage.setItem('numFrontend', numFrontend), [numFrontend]);
  const [numFrontendLOC, setNumFrontendLOC] = React.useState(parseInt(localStorage.getItem('numFrontendLOC') || '0')); // Rate of frontend LOC
  React.useEffect(() => localStorage.setItem('numFrontendLOC', numFrontendLOC), [numFrontendLOC]);
  const [numBackend, setNumBackend] = React.useState(parseInt(localStorage.getItem('numBackend') || '0'));
  React.useEffect(() => localStorage.setItem('numBackend', numBackend), [numBackend]);
  const [numBackendLOC, setNumBackendLOC] = React.useState(parseInt(localStorage.getItem('numBackendLOC') || '0')); // Rate of backend LOC
  React.useEffect(() => localStorage.setItem('numBackendLOC', numBackendLOC), [numBackendLOC]);
  const [totalCost, setTotalCost] = React.useState(parseInt(localStorage.getItem('totalCost') || '0'));
  React.useEffect(() => localStorage.setItem('totalCost', totalCost), [totalCost]);
  const [bonusLOC, setBonusLOC] = React.useState(parseInt(localStorage.getItem('bonusLOC') || '0'));
  React.useEffect(() => localStorage.setItem('bonusLOC', bonusLOC), [bonusLOC]);
  const [addedForm, setAddedForm] = React.useState(false);
  const [addedProj, setAddedProj] = React.useState(false);
  const [fireMe, setFireMe] = React.useState(null);
  const [improve, setImprove] = React.useState(parseInt(localStorage.getItem('improve') || '-1'));
  React.useEffect(() => localStorage.setItem('improve', improve), [improve]);

  // Paperwork
  const MAX_PAPERS = 3;
  const [papers, setPapers] = React.useState(JSON.parse(localStorage.getItem('papers') || '[]'));
  React.useEffect(() => localStorage.setItem('papers', JSON.stringify(papers)), [papers]);
  const [allEmployeeFields, setAllEmployeeFields] = React.useState([]);
  const [allProjectFields, setAllProjectFields] = React.useState([]);
  const [numHireForms, setNumHireForms] = React.useState(0);
  const [specialEmployeeForms, setSpecialEmployeeForms] = React.useState([]);
  const [projectForms, setProjectForms] = React.useState([]);
  const [employeeImprovementForms] = React.useState([]);
  const [specialProjects, setSpecialProjects] = React.useState([]);

  const [formTypeQueue, setFormTypeQueue] = React.useState('');
  const [rewardForm, setRewardForm] = React.useState(null);
  const [specialProjectRate, setSpecialProjectRate] = React.useState(parseInt(localStorage.getItem('specialProjectRate') || '6'));
  React.useEffect(() => localStorage.setItem('specialProjectRate',specialProjectRate), [specialProjectRate]);

  const [blockScroll] = useScrollBlock();
  blockScroll();

  const [theme, setTheme] = React.useState(createTheme({
    palette: {
      mode: brightnessMode,
      primary: {
        main: myColors[colorTheme]
      }
    }
  }));

  React.useEffect(() => {
    if (money >= 1000000) {
      if (brightnessMode !== 'dark') setBrightnessMode('dark');
    }
    else if (money >= 500000) {
      if (colorTheme !== 'red') setColorTheme('red');
    }
    else if (money >= 200000) {
      if (colorTheme !== 'orange') setColorTheme('orange');
    }
    else if (money >= 100000) {
      if (colorTheme !== 'green') setColorTheme('green');
    }
    else if (money >= 50000) {
      if (colorTheme !== 'purple') setColorTheme('purple');
    }
  }, [money, colorTheme, brightnessMode]);

  React.useEffect(() => {
    const color = myColors[colorTheme];
    if(color !== theme.palette.primary.main || brightnessMode !== theme.palette.mode){
      setTheme(createTheme({
        palette: {
          mode: brightnessMode,
          primary: {
            main: color
          }
        }
      }));
    }
  }, [colorTheme, brightnessMode, theme, myColors]);

  React.useEffect(() => {
    if (fireMe) {
      if (fireMe.frontend) {
        setNumFrontend(numFrontend - 1);
        setNumFrontendLOC(numFrontendLOC - fireMe.profit);
      }
      else {
        setNumBackend(numBackend - 1);
        setNumBackendLOC(numBackendLOC - fireMe.profit);
      }
      setTotalCost(totalCost - fireMe.cost);
      setFireMe(null);
    }
  }, [fireMe, numBackend, numBackendLOC, numFrontend, numFrontendLOC, totalCost]);

  // Apply rewards when a form is submitted
  React.useEffect(() => {
    if (rewardForm) {
      if (story === 3) {
        addM(`Well done! You've hired your first employee. As you continue to expand your team, you will continue to attract talent and build a successful company. Now, let's head back to the 'Home' tab.`);
        setStory(4);
      }
      if (story === 7) {
        addM(`Great, we've hired our second employee, a backend developer this time.`);
        setStory(8);
      }
      if (rewardForm.money) { // Earn money
        setMoney(money + rewardForm.money);
        setAddedForm(true);
        setSnackbarSuccessMsg(`Earned $${rewardForm.money}!`);
      }
      if (rewardForm.worker) { // Get a special employee
        const E = rewardForm.worker;
        setAddedForm(true);
        setSnackbarSuccessMsg(`Hired employee ${E.name || E.number}!`);
        setEmployees([...employees, E]);
        if(E.frontend){
          setNumFrontend(numFrontend + 1);
          setNumFrontendLOC(numFrontendLOC + E.profit);
        }
        else{
          setNumBackend(numBackend + 1);
          setNumBackendLOC(numBackendLOC + E.profit);
        }
        setTotalCost(totalCost + E.cost);
      }
      if (rewardForm.maxEmployees) { // Increase max number of employees
        setMaxEmployees(maxEmployees + rewardForm.maxEmployees);
      }
      if (rewardForm.currentLOC) { // Increase profit of all current employees
        setAddedForm(true);
        setSnackbarSuccessMsg(`Increased productivity of your employees by ${rewardForm.currentLOC}!`);
        let E = employees;
        E.forEach((e) => {
          e.profit += rewardForm.currentLOC;
        })
        setEmployees(E);
      }
      if (rewardForm.futureLOC) {
        setAddedForm(true);
        setSnackbarSuccessMsg(`Increased productivity of future employees by ${rewardForm.futureLOC}!`);
        setBonusLOC(bonusLOC + rewardForm.futureLOC);
      }
      if (rewardForm.project) {
        setAddedForm(true);
        setSnackbarSuccessMsg(`Started project ${rewardForm.project.name}!`);
        setProjects([...projects, rewardForm.project]);
      }
      if (rewardForm.specialProjectRate) {
        setAddedForm(true);
        setSnackbarSuccessMsg(`Increased rate of special projects!`);
        setSpecialProjectRate(Math.max(2,specialProjectRate - 1));
      }
      setRewardForm(null);
    }
  }, [rewardForm, money, employees, numFrontend, numFrontendLOC, numBackend, numBackendLOC, totalCost, maxEmployees, bonusLOC, totalPapers, projects, addM, story, specialProjectRate]);

  // Finish a project once its frontend & backend are complete
  React.useEffect(() => {
    if (currentProject && currentProject.frontend[0] === currentProject.frontend[1] && currentProject.backend[0] === currentProject.backend[1]) {
      if (story === 8) {
        addM(`Awesome work! You've successfully completed your first project.`);
        setStory(9);
      }
      else if (story === 10) {
        addM(`Great, you've completed the first part of this project! Of course, we still need to sign off to ensure our development team aligns with client expectations. Head to the 'Paperwork' tab and approve the project.`);
        setStory(11);
      }
      else if (story === 12) {
        addM(`Awesome, you've completed your second project. As your company grows, you will open up new possibilities for increasing your company's productivity. Well, the tutorial ends here, so good luck!`);
        setStory(13);
        setImprove(60 + Math.floor(Math.random() * 60));
      }

      setTotalProjects(totalProjects + 1);

      // console.log(`Completed project ${currentProject.name}`, currentProject);
      setAddedProj(true);

      if (currentProject.worker) {
        setSpecialEmployeeForms([...specialEmployeeForms, currentProject.worker]);
      }
      else if (currentProject.project) {
        setProjectForms([...projectForms, currentProject.project]);
      }
      else {
        setRewardForm(currentProject);
      }
      setCurrentProject(null);
    }
    if (!currentProject && projects.length > 0 && time % 5 === 0) {
      setCurrentProject(projects[0]);
      let P = projects;
      P.shift();
      setProjects(P);
      if (story === 9) {
        addM(`You've received your second contract to build a website! This time, it's a two-part contract: completing the first part of the project unlocks the second part of the project.`);
        setStory(10);
      }
      else if (story === 11) {
        addM(`This project has a special reward to increase the maximum number of employees of your company. This is an incredible opportunity to scale up and take on larger projects!`);
        setStory(12);
      }
    }
  }, [currentProject, projects, projectForms, specialEmployeeForms, time, hour, totalProjects, story, addM]);

  const [pHours, setPHours] = React.useState([]);
  const [pDay, setPDay] = React.useState(0);

  React.useEffect(() => {
    if (view === 'employees' && story === 0) {
      setStory(1);
      addM(`Let's begin by hiring your first employee. Click the 'Add Employee Application' button.`);
    }
    if (view === 'paperwork' && story === 2) {
      setStory(3);
      addM(`Here, we can evaluate potential candidates based on their qualifications. You'll have access to their relevant info. Take your time to assess if they meet your requirements before making a hiring decision.`);
    }
    if (story === 5 && currentProject && currentProject.frontend[0] > 30) {
      setStory(6);
      addM(`Hmm, looks like the person we hired only writes frontend code. We need to hire a backend developer! Head over to the 'Employee' tab and hire another employee.`);
      setMaxEmployees(2);
    }
  }, [view, story, addM, currentProject]);

  // React.useEffect(() => {
  //   localStorage.removeItem('money_graph');
  //   localStorage.removeItem('loc_graph');
  //   localStorage.removeItem('project_graph');
  //   localStorage.removeItem('paper_graph');
  // })

  // Track day + hour
  React.useEffect(() => {
    let myInterval = setInterval(() => {
      let donoed = false;
      if(time === 9){

        // let money_graph = JSON.parse(localStorage.getItem('money_graph') || '[]');
        // money_graph.push(Math.round(money));
        // localStorage.setItem('money_graph', JSON.stringify(money_graph));
        // let loc_graph = JSON.parse(localStorage.getItem('loc_graph') || '[]');
        // loc_graph.push(Math.round(totalLOC));
        // localStorage.setItem('loc_graph', JSON.stringify(loc_graph));

        if (day === 0 && hour === 2) {
          setOpenMessages(true);
          addM(`Welcome to Your Website Here! Get ready to dive into the exciting world of web development and manage your own website building company. Let's get started!`);
        }
        if (day === 0 && hour === START) {
          addM(`First, head over to the 'Employee' tab to view your company's workforce. This is where all the magic happens!`);
        }
        if (view === 'home' && hour % 4 === 0 && story === 4 && !currentProject) {
          setCreateProject(true);
        }
        if (view === 'home' && hour % 6 === 0 && story === 9 && !currentProject) {
          setCreateProject(true);
        }
        if (improve === 0) {
          let perm = [];
          for (let i=0; i<employees.length; i++) perm.push(i);
          let currentIndex = perm.length, randomIndex;
          while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [perm[currentIndex], perm[randomIndex]] = [
              perm[randomIndex], perm[currentIndex]];
          }
          for (let i=0; i<perm.length; i++) {
            let E = employees;
            let j = perm[i];
            if (!E[j].level) {
              let x = Math.floor(Math.random() * 5);
              if (x === 0) addM(`Employee ${E[j].name || E[j].number} received a promotion for consistently demonstrating exceptional performance, exceeding targets, and delivering outstanding results.`);
              else if (x === 1) addM(`Through strong leadership skills and ability to inspire others, we are proud to present Employee ${E[j].name || E[j].number} with the Employee of the Month award.`);
              else if (x === 2) addM(`Employee ${E[j].name || E[j].number} has gone above and beyond to ensure the satisfaction of our valued customers. We are excited to share the news of promoting Employee ${E[j].name || E[j].number} to Level 2.`);
              else if (x === 3) addM(`Employee ${E[j].name || E[j].number} has received a promotion for their positive attitude, commitment to core values, and efforts to foster a collaborative and inclusive work environment.`);
              else addM(`For their invaluable service, Employee ${E[j].name || E[j].number} received a promotion.`);
              E[j].level = 2;
              E[j].profit *= 2;
              setEmployees(E);
              break;
            }
          }
          setImprove(60 + Math.floor(Math.random() * 60));
        }
        else {
          setImprove(improve - 1);
        }

        if (maxEmployees >= 5 && Math.random() < 0.004) {
          let perm = [];
          for (let i=0; i<employees.length; i++) perm.push(i);
          let currentIndex = perm.length, randomIndex;
          while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [perm[currentIndex], perm[randomIndex]] = [
              perm[randomIndex], perm[currentIndex]];
          }
          for (let i=0; i<perm.length; i++) {
            let E = employees;
            let j = perm[i];
            if (!E[j].fired) {
              E[j].fired = true;
              setFireMe(E[j]);
              let x = Math.floor(Math.random() * 3);
              let y = Math.floor(Math.random() * 3);
              if (x === 0) addM(`Employee ${E[j].name || E[j].number} has been fired for ${['sexual harassment', 'murder', 'public indecency'][y]}.`);
              else if (x === 1) addM(`We are sorry to see Employee ${E[j].name || E[j].number} go. We do not tolerate any forms of ${['racism', 'anti-Semitism', 'sexism'][y]}.`);
              else addM(`Employee ${E[j].name || E[j].number} has passed away due to ${['heart complications', 'a tragic accident', 'unknown reasons'][y]}.`);
              setEmployees(E);
              break;
            }
          }
        }

        if (maxEmployees >= 5 && Math.random() < 0.001) {
          setAddedForm(true);
          const dono = 100000 * Math.floor(Math.random() * 11);
          setSnackbarSuccessMsg(`Earned $${dono}!`);
          addM(`You received a donation of ${dono}!`);
          setMoney(money + dono);
          donoed = true;
        }

        if(hour === 23){
          setDay(day + 1);
          setHour(0);
          if (numFrontend > 0 || numBackend > 0) {
            let no = starterProject <= 1;
            no |= starterProject === 2 && totalPapers < 3;
            no |= totalProjects === 2;
            if (!no) setCreateProject(true);
          }

          // let project_graph = JSON.parse(localStorage.getItem('project_graph') || '[]');
          // project_graph.push(totalProjects);
          // localStorage.setItem('project_graph', JSON.stringify(project_graph));
          // let paper_graph = JSON.parse(localStorage.getItem('paper_graph') || '[]');
          // paper_graph.push(totalPapers);
          // localStorage.setItem('paper_graph', JSON.stringify(paper_graph));
          // let worker_graph = JSON.parse(localStorage.getItem('worker_graph') || '[]');
          // worker_graph.push(numEmployees);
          // localStorage.setItem('worker_graph', JSON.stringify(worker_graph));
        }
        else{
          if (starterProject > 1) {
            if (pHours.includes(hour)) {
              setCreateProject(true);
            }
            else if (!currentProject && projects.length === 0 && totalProjects >= 3 && pDay !== day) {
              setPHours([...pHours, hour]);
              console.log(`Adding to phour: ${hour}`);
              setPDay(day);
              setCreateProject(true);
            }
          }
          setHour(hour + 1);
        }
        setTime(0);
      }
      else{
        setTime(time + 1);
        if (time === 1 && projects.length < 8 && maxEmployees > 40) setCreateProject(true);
        else if (time === 2 && projects.length < 7 && maxEmployees > 35) setCreateProject(true);
        else if (time === 3 && projects.length < 6 && maxEmployees > 30) setCreateProject(true);
        else if (time === 4 && projects.length < 5 && maxEmployees > 25) setCreateProject(true);
        else if (time === 5 && projects.length < 4 && maxEmployees > 20) setCreateProject(true);
        else if (time === 6 && projects.length < 3 && maxEmployees > 15) setCreateProject(true);
        else if (time === 7 && projects.length < 2 && maxEmployees > 10) setCreateProject(true);
        else if (time % 3 === 0 && projects.length < 2 && maxEmployees > 50) setCreateProject(true);
      }
      setGlobalTime(globalTime + 1);
      if (currentProject) {
        let p = currentProject;
        const newFrontend = Math.min(p.frontend[0] + numFrontendLOC / 10, p.frontend[1]);
        const newBackend = Math.min(p.backend[0] + numBackendLOC / 10, p.backend[1]);
        setTotalLOC(totalLOC + newFrontend - p.frontend[0] + newBackend - p.backend[0]);
        p.frontend[0] = newFrontend;
        p.backend[0] = newBackend;
        setCurrentProject(p);
      }
      if (!donoed) setMoney(money - totalCost / 10);
    }, speed/10);
    return () => clearInterval(myInterval);
  }, [speed, time, hour, day, currentProject, createProject, numFrontendLOC, numBackendLOC, money, totalCost,
    totalLOC, pHours, pDay, addM, numBackend, numFrontend, starterProject, story, totalPapers, totalProjects, totalLOC, view, globalTime, employees, improve, maxEmployees, projects.length]);

  // Update numEmployees
  React.useEffect(() => {
    if(numFrontend + numBackend !== numEmployees) {
      setNumEmployees(numFrontend + numBackend);
    }
  }, [numEmployees, numFrontend, numBackend]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Add employee application
  let inputs = [];
  inputs[0] = [{name: 'Social Security Number', integer: true}];
  inputs[1] = [{name: 'Date Available', date: true}];
  inputs[2] = [{name: 'Email'}, {name: 'Phone number'}, {name: 'Address'}];
  inputs[3] = [{name: 'High School GPA', integer: true}, {name: 'College GPA', integer: true}];
  inputs[4] = [{name: 'City'}, {name: 'State'}, {name: 'Zip Code'}];

  let radios = [];
  radios[0] = {name: 'Hours', values: ['Full-Time', 'Part-Time', 'Seasonal'], row: true};
  radios[1] = {name: 'Working Times', values: ['Days', 'Evenings', 'Nights'], row: true};
  radios[2] = {name: 'Status', values: ['Regular', 'Temporary', 'Intern'], row: true};
  radios[3] = {name: 'Does employee have a High School Diploma or GED?', values: ['yes', 'no']};
  radios[4] = {name: 'Can the employee perform the essential functions of the job with or without reasonable accommodation?', values: ['yes', 'no']};
  radios[5] = {name: 'Does employee consent to a background check?', values: ['Consent', 'No consent']};
  radios[6] = {name: 'Does employee consent to contacting past employers?', values: ['Consent', 'No consent']};
  radios[7] = {name: 'Sex', values: ['Male', 'Female', 'Other']};
  radios[8] = {name: 'Does employee have military experience?', values: ['yes', 'no']};

  let checkboxes = [];
  checkboxes[0] = {name: 'Available locations', values: ['Seattle', 'San Francisco', 'New York City', 'Dallas']};
  checkboxes[1] = {name: 'Pronouns', values: ['she/her/hers', 'he/him/his', 'they/them/theirs', 'other']};

  let ratings = [];
  ratings[0] = [{name: 'Leadership'}, {name: 'Management'}];
  ratings[1] = [{name: 'Communication'}, {name: 'Conflict Resolution'}];
  ratings[2] = [{name: 'Motivation'}, {name: 'Dedication'}, {name: 'Compassion'}];
  ratings[3] = [{name: 'Cognitive Intelligence'}, {name: 'Emotional Intelligence'}];
  ratings[4] = [{name: 'Ethics'}, {name: 'Morals'}];
  ratings[5] = [{name: 'Teamwork'}, {name: 'Interpersonal Skills'}];
  ratings[6] = [{name: 'Confidence'}];
  ratings[7] = [{name: 'Reliability'}, {name: 'Independence'}];
  ratings[8] = [{name: 'Integrity'}, {name: 'Honesty'}];

  let selects = [];
  selects[0] = {name: 'College Degree', values: ['Computer Science', 'Computer Engineering', 'Computer Science: Game Design', 'Graphic Design', 'Other']};
  selects[1] = {name: 'How did you hear about us?', values: ['Linkedin', 'University Hiring Event', 'University Job Board', 'Word of Mouth']};

  let sliders = [];
  sliders[0] = {name: 'Desired Pay Range', min: 50000, max: 200000, step: 1000, range: true};

  React.useEffect(() => {
    if(allEmployeeFields.length === 0){
      let a = [];
      for(let f of inputs){
        f.forEach((e) => e.type = 'input');
        a.push(f);
      }
      for(let f of radios){
        f.type = 'radios';
        a.push(f);
      }
      for(let f of checkboxes){
        f.type = 'checkboxes';
        a.push(f);
      }
      for(let f of ratings){
        f.forEach((e) => e.type = 'rating');
        a.push(f);
      }
      for(let f of selects){
        f.type = 'select';
        a.push(f);
      }
      for(let f of sliders){
        f.type = 'slider';
        a.push(f);
      }
      setAllEmployeeFields(a);
    }
  });

  // Add project application
  let inputs2 = [];
  inputs2[0] = [{name: 'Project Name'}, {name: 'Project Description'}];
  inputs2[1] = [{name: 'Project Background'}, {name: 'Project Goal'}];
  inputs2[2] = [{name: 'Project Chair'}, {name: 'Project Co-Chair'}];
  inputs2[3] = [{name: 'Testing Method'}, {name: 'Testing Team'}];
  inputs2[4] = [{name: 'Decouple modules with indirection'}];

  let radios2 = [];
  radios2[0] = {name: 'Development Architecture', values: ['Agile', 'Kanban', 'Traditional'], row: true};
  radios2[1] = {name: 'Type of Development', values: ['Behavioral', 'Test'], row: true};
  radios2[2] = {name: 'Type of Project', values: ['Frontend', 'Backend', 'Full-Stack'], row: true};
  radios2[3] = {name: 'Type of Developers', values: ['Intern', 'Junior', 'Senior'], row: true};
  radios2[4] = {name: 'Type of Scaling', values: ['Constant', 'Polynomial', 'Exponential', 'N/A'], row: true};
  radios2[5] = {name: 'Type of Modularity', values: ['Soft', 'Hard'], row: true};
  radios2[6] = {name: 'Safety Margin', values: ['Shake-out mode', 'Production mode'], row: true};
  radios2[7] = {name: 'Memory Layout', values: ['Random-access', 'Associative'], row: true};

  let checkboxes2 = [];
  checkboxes2[0] = {name: 'Division of work', values: ['Workflow', 'Alterative', 'Lifecycle', 'Convenience Level']};
  checkboxes2[1] = {name: 'Available meeting days', values: ['Weekdays', 'Weekends', 'N/A']};
  checkboxes2[2] = {name: 'Desirable Characteristics', values: ['Independent', 'Repeatable', 'Self-Validating']};
  checkboxes2[3] = {name: 'Memory Hierarchy', values: ['Capacity', 'Latency', 'Order of Access']};
  checkboxes2[4] = {name: 'Concurrency', values: ['Atomicity', 'Coherence']};
  checkboxes2[5] = {name: 'Type of RPC', values: ['At least once', 'At most once', 'Exactly once']};
  checkboxes2[6] = {name: 'Virtualization', values: ['Multiplexing', 'Emulation', 'Aggregation']};

  let ratings2 = [];
  ratings2[0] = [{name: 'Experience Level'}, {name: 'Confidence Level'}];
  ratings2[1] = [{name: 'Difficulty Level'}, {name: 'Complexity Level'}];

  let selects2 = [];
  selects2[0] = {name: 'Years of Experience', values: ['0', '1', '2', '3+']};
  selects2[1] = {name: 'Frame of Mind', values: ['Who', 'What', 'When', 'Where', 'Why']};
  selects2[2] = {name: 'Favorite Vowel', values: ['a', 'e', 'i', 'o', 'u']};
  selects2[3] = {name: 'Finite Resources Plan', values: ['Maximize it', 'Avoid wasting it', 'Prioritize it']};
  selects2[4] = {name: 'Driving Principle', values: ['If it is good for everything, it is good for nothing', 'Diminishing returns', `Hofstadter's law`]};

  let sliders2 = [];
  sliders2[0] = {name: 'Requested Funding', min: 1000, max: 30000, step: 100};
  sliders2[1] = {name: 'Expected Project Duration (days)', min: 3, max: 365, step: 1};
  sliders2[2] = {name: 'Frontend vs. Backend', min: 0, max: 10, step: 1};
  sliders2[3] = {name: 'Risk Tolerance', min: 0, max: 100, step: 1, range: true};
  sliders2[4] = {name: 'Time spent writing vs. reading code', min: 0, max: 100, step: 1};
  sliders2[5] = {name: 'Throughput vs. Latency', min: 0, max: 10, step: 1, range: true};
  sliders2[6] = {name: 'Purpose vs. Granularity', min: 0, max: 10, step: 1, range: true};

  React.useEffect(() => {
    if(allProjectFields.length === 0){
      let a = [];
      for(let f of inputs2){
        f.forEach((e) => e.type = 'input');
        a.push(f);
      }
      for(let f of radios2){
        f.type = 'radios';
        a.push(f);
      }
      for(let f of checkboxes2){
        f.type = 'checkboxes';
        a.push(f);
      }
      for(let f of ratings2){
        f.forEach((e) => e.type = 'rating');
        a.push(f);
      }
      for(let f of selects2){
        f.type = 'select';
        a.push(f);
      }
      for(let f of sliders2){
        f.type = 'slider';
        a.push(f);
      }
      setAllProjectFields(a);
    }
  });

  React.useEffect(() => {
    if (specialProjects.length === 0) {
      const p = [];
      p[0] = {name: 'Maple Story 1', project: {name: 'Maple Story 2', project: {name: 'Maple Story 3', currentLOC: 40}}};
      p[1] = {name: 'Toy Story 1', project: {name: 'Toy Story 2', project: {name: 'Toy Story 3', project: {name: 'Toy Story 4', futureLOC: 44}}}};
      p[2] = {name: 'Orange', project: {name: 'Tangerine', maxEmployees: 10}};
      p[3] = {name: 'Intercontinental Ballistic System', project: {name: 'Ballistic Missile Defense System', maxEmployees: 10}};
      p[4] = {name: 'Pepsi', project: {name: 'Pepsi Remastered', currentLOC: 25}};
      p[5] = {name: 'Rock', project: {name: 'Paper', project: {name: 'Scissors', currentLOC: 50}}};
      p[6] = {name: 'Counter-Strike', project: {name: 'Counter-Strike: Global Offensive', project: {name: 'Counter-Strike 2', futureLOC: 50}}};
      p[7] = {name: 'Squirtle', project: {name: 'Wartortle', project: {name: 'Blastoise', futureLOC: 55}}};
      p[8] = {name: 'World Domination', project: {name: 'Unlimited Power', project: {name: 'My Supremacy', project: {name: 'Ascendancy', futureLOC: 200}}}};

      const companies = ['Google', 'Uber', 'Reddit', 'REI', 'Netflix', 'Wells Fargo', 'Jane Street', 'Rivian', 'XO Vista', 'Apple', 'Kirkland', 'CVS', 'Cigna',
      'MLB', 'Ford Motors', 'PepsiCo', 'Tesla', 'Adidas', 'In-N-Out', 'John Deere', 'Roblox', 'Microsoft', 'Disney', 'Citi', 'Volkswagen', "Jack Daniel's", 'Sony',
    'Oracle', 'Ebay', 'Kia Motors', 'AT&T'];

      const first = ['Bug', 'India', 'Tobias', 'Sleepy', 'Subpeona', 'Image', 'Dequeued', 'Preoccupied', 'Psych', 'Simply', 'Behave', 'Cautious', 'Seedy', 'Speed', 'Free', 'Cryptic', 'Plum', 'Acute', 'Decided', 'Silver'];
      const last = ['Iron', 'Chimera', 'D', 'Amalgam', 'Morias', 'King', 'Phoenix', 'Iguana', 'Mayhem', 'Elephant', 'Easel', 'Danger', 'Source', 'Referrer', 'Motel', 'Model', 'Turtle', 'Frog', 'Gator', 'Wasp', 'Dwarf'];

      companies.forEach((company) => {
        let x = Math.floor(Math.random() * 5);
        if (Math.random() < 0.2 && specialProjectRate > 2) {
          p.push({name: company, specialProjectRate: true});
        }
        else if (x < 2 || (maxEmployees < 20 && x < 4)) p.push({name: company, maxEmployees: 3 + Math.floor(Math.random() * 3)});
        else if (x === 2) p.push({name: company, currentLOC: 10 + Math.floor(Math.random() * 10)});
        else if (x === 3) p.push({name: company, futureLOC: 20 + Math.floor(Math.random() * 20)});
        else p.push({name: company, worker: {name: `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`}});
      });
      setSpecialProjects(p);
    }
  }, [specialProjects, specialProjectRate]);

React.useEffect(() => {
  if (!createProject) {
    return;
  }
  if (projects.length >= MAX_PROJECTS) {
    return;
  }
  if (starterProject === 0) {
    addM(`You've received your first contract to build a website! This is a significant milestone for your company. Here, we can see the client's requirements including the lines of code required for the frontend and backend, as well as the reward.`);
    setStory(5);
    const project = {name: 'First Website', color: projectColors[0], icon: 0, iconColor: 'purple', frontend: [0,70], backend: [0,100], money: 200};
    setProjects([...projects, project]);
    setStarterProject(1);
    setCreateProject(false);
    return;
  }
  if (starterProject === 1) {
    const project = {name: 'Second Website part 1', color: projectColors[2], icon: 1, iconColor: 'orange', frontend: [0,85], backend: [0,120], project: {name: 'Second Website part 2', maxEmployees: 3}};
    setProjects([...projects, project]);
    setStarterProject(2);
    setCreateProject(false);
    return;
  }
  const number = Math.floor(Math.random() * 900) + 100;
  const color = projectColors[Math.floor(Math.random() * 8)];
  const icon = Math.floor(Math.random() * 28);
  const iconColor = ['blue', 'purple', 'green', 'orange', 'red'][Math.floor(Math.random() * 5)];
  if (specialProjectTimer === 0) {
    const frontend = (4 + Math.floor(Math.pow(day, 1.3)) + Math.floor(Math.random() * 11)) * 100;
    const backend = (4 + Math.floor(Math.pow(day, 1.3)) + Math.floor(Math.random() * 16)) * 100;
    let project = specialProjects[Math.floor(Math.random() * specialProjects.length)];
    project.color = color;
    project.icon = icon;
    project.iconColor = iconColor;
    project.frontend = [0,frontend];
    project.backend = [0,backend];
    setProjects([...projects, project]);
    setSpecialProjectTimer(Math.floor(Math.random() * specialProjectRate) + 1);
  }
  else {
    const frontend = (3 + Math.floor(Math.pow(day, 1.2)) + Math.floor(Math.random() * 8)) * 50;
    const backend = (3 + Math.floor(Math.pow(day, 1.2)) + Math.floor(Math.random() * 10)) * 50;
    const money = Math.floor((10 + day * day + Math.floor(Math.random() * 40))) * 100;
    const project = {name: `Website ${number}`, icon: icon, iconColor: iconColor, frontend: [0,frontend], backend: [0,backend], money: money};
    setProjects([...projects, project]);
    setSpecialProjectTimer(specialProjectTimer - 1);
  }
  setCreateProject(false);
}, [createProject, projects, MAX_PROJECTS, projectColors, specialProjectTimer, numFrontendLOC, numBackendLOC, specialProjects, totalCost, day, starterProject, specialProjectRate, addM]);

  React.useEffect(() => {
    if(papers.length < MAX_PAPERS){
      let a = [];
      if (numHireForms > 0) a.push('hire');
      if (specialEmployeeForms.length > 0) a.push('special worker');
      if (projectForms.length > 0) a.push('project');
      if (employeeImprovementForms.length > 0) a.push('worker improvement');

      // Can add more form types here

      if(a.length > 0) setFormTypeQueue(a[Math.floor(Math.random() * a.length)]);
    }
  }, [papers, MAX_PAPERS, formTypeQueue, numHireForms, specialEmployeeForms, projectForms, employeeImprovementForms]);

  const createEmployeeFields = () => {
    let fields = [];
    let n = allEmployeeFields.length;
    let used = new Set();
    for (let i=1; i<=Math.floor(Math.random() * 2) + 3; i++) {
      let j = Math.floor(Math.random() * n);
      while(used.has(j)){
        j = Math.floor(Math.random() * n);
      }
      used.add(j);
      if(Array.isArray(allEmployeeFields[j])){
        allEmployeeFields[j].forEach((f) => fields.push(f));
      }
      else{
        fields.push(allEmployeeFields[j]);
      }
    }
    return fields;
  };

  const createProjectFields = () => {
    let fields = [];
    let n = allProjectFields.length;
    let used = new Set();
    for (let i=1; i<=Math.floor(Math.random() * 2) + 3; i++) {
      let j = Math.floor(Math.random() * n);
      while(used.has(j)){
        j = Math.floor(Math.random() * n);
      }
      used.add(j);
      if(Array.isArray(allProjectFields[j])){
        allProjectFields[j].forEach((f) => fields.push(f));
      }
      else{
        fields.push(allProjectFields[j]);
      }
    }
    return fields;
  };

  // Add employee hiring form if numHireForms is positive and can add papers
  React.useEffect(() => {
    if(numHireForms > 0 && papers.length < MAX_PAPERS && formTypeQueue === 'hire'){
      const number = Math.floor(Math.random() * 900) + 100;
      const color = ['blue', 'purple', 'green', 'orange', 'red'][Math.floor(Math.random() * 5)];
      const avatar = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];

      let fields = createEmployeeFields();
      let app = {color: color, avatar: avatar, title: `Employee ${number} Application`, subheader: `Backend Developer`, fields: fields };

      const cost = 15 + Math.floor(Math.random() * 16); // [15 to 30]
      const profit = 30 + bonusLOC + Math.floor(Math.random() * 31); // [30 to 60]
      app.worker = {number: number, cost: cost, profit: profit, color: color};

      if(Math.random() < 0.5) {
        app.frontend = true;
        app.subheader = 'Frontend Developer';
        app.worker.frontend = true;
      }
      
      app.handle_submit = () => {
        setAddedForm(true);
        setSnackbarSuccessMsg(`You hired Employee ${number}!`);
      }
      setPapers([...papers, app]);
      setNumHireForms(numHireForms - 1);
    }
  }, [numHireForms, papers, MAX_PAPERS, formTypeQueue, employees, bonusLOC, allEmployeeFields, addedForm, snackbarSuccessMsg, createEmployeeFields]);

  // Add special hiring form if specialEmployeeForms is non-empty and can add papers
  React.useEffect(() => {
    if(specialEmployeeForms.length > 0 && papers.length < MAX_PAPERS && formTypeQueue === 'special worker'){
      // name, cost, profit, and frontend are decided
      const color = ['purple', 'orange', 'red'][Math.floor(Math.random() * 3)];
      const avatar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];

      let fields = createEmployeeFields();
      let worker = specialEmployeeForms[0];
      let app = {color: color, avatar: avatar, title: `Application of ${worker.name}`, subheader: 'Backend Developer', fields: fields };

      if(Math.random() < 0.5) {
        app.frontend = true;
        app.subheader = 'Frontend Developer';
        worker.frontend = true;
      }

      const cost = 30 + Math.floor(Math.random() * 31);
      // 20% to 50% of total profit
      const profit = bonusLOC + Math.floor(((Math.random() * 3) + 2) * (worker.frontend ? numFrontendLOC : numBackendLOC) / 10);
      worker.color = color;
      worker.cost = cost;
      worker.profit = profit;
      app.worker = worker;
      
      app.handle_submit = () => {
        setAddedForm(true);
        setSnackbarSuccessMsg(`You hired ${worker.name}!`);
      }
      console.log('Adding special employee form');
      setPapers([...papers, app]);
      let P = specialEmployeeForms;
      P.shift();
      setSpecialEmployeeForms(P);
    }
  }, [numHireForms, papers, MAX_PAPERS, formTypeQueue, employees, bonusLOC, specialEmployeeForms, numFrontendLOC, numBackendLOC, snackbarSuccessMsg, addedForm, allEmployeeFields, createEmployeeFields]);

  // Add project form if projectForms is non-empty and can add papers
  React.useEffect(() => {
    if(projectForms.length > 0 && papers.length < MAX_PAPERS && formTypeQueue === 'project'){
      // {name: 'Maple Story 2', color: purple['A400'], icon: 6, frontend: [0,1150], backend: [0,1200], money: 3500}
      const color = ['blue', 'purple', 'green', 'orange', 'red'][Math.floor(Math.random() * 5)];
      const avatar = '0123456789'[Math.floor(Math.random() * 10)];
      const projectColor = projectColors[Math.floor(Math.random() * 8)];
      const icon = Math.floor(Math.random() * 28);
      let frontend = (5 + Math.floor(Math.pow(day, 1.3)) + Math.floor(Math.random() * 8)) * 100;
      let backend = (5 + Math.floor(Math.pow(day, 1.3)) + Math.floor(Math.random() * 12)) * 100;

      let fields = createProjectFields();
      let project = projectForms[0];
      if (project.name === 'Second Website part 2') {
        frontend = 90;
        backend = 100;
      }
      project.color = projectColor;
      project.icon = icon;
      project.iconColor = color;
      project.frontend = [0, frontend];
      project.backend = [0, backend];

      let app = {color: color, avatar: avatar, title: `Project ${project.name}`, subheader: `Project Proposal`, fields: fields, project: project};
      app.handle_submit = () => {
        setAddedForm(true);
        setSnackbarSuccessMsg(`You proposed Project ${project.name}!`);
      }
      setPapers([...papers, app]);
      let P = projectForms;
      P.shift();
      setProjectForms(P);
    }
  }, [projectForms, papers, MAX_PAPERS, formTypeQueue, projectColors, numFrontendLOC, numBackendLOC, allProjectFields, addedForm, snackbarSuccessMsg, day, createProjectFields]);
  

  const handleAddApplication = () => {
    if (story === 1) {
      addM(`Now, hiring the right talent is crucial to our mission of building the best websites. It's important we vet our employees carefully! To vet our first employee, head to the 'Paperwork' tab.`);
      setStory(2);
    }
    if(story === 6) {
      addM(`Once again, we need to review our candidate's qualifications. Head over to the 'Paperwork' tab.`);
      setStory(7);
    }

    setAddedForm(true);
    setSnackbarSuccessMsg('Added application!');
    if (starterEmployees === 0) {
      const starter_frontend = {name: 'Fiona', cost: 1, profit: 3, color: 'blue', frontend: true};
      const fields = createEmployeeFields();
      const app = {color: 'blue', avatar: 'F', title: 'Application of Fiona', subheader: 'Frontend Developer', fields: fields, worker: starter_frontend};
      setPapers([...papers, app]);
      setStarterEmployees(1);
    }
    else if (starterEmployees === 1) {
      const starter_backend = {name: 'Brandon', cost: 1, profit: 5, color: 'green'};
      const fields = createEmployeeFields();
      const app = {color: 'green', avatar: 'B', title: 'Application of Brandon', subheader: 'Backend Developer', fields: fields, worker: starter_backend};
      setPapers([...papers, app]);
      setStarterEmployees(2);
    }
    else {
      setNumHireForms(numHireForms + 1);
    }
  }

  const handleCloseAddedForm = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAddedForm(false);
  }

  const handleCloseAddedProj = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAddedProj(false);
  }

  return (
    <ThemeProvider theme={theme}>
    <Container component='main'>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            sx={{ mr: 2 }}
            onClick={() => setView('home')}
          >
            <WebIcon />
          </IconButton>
          <Typography variant={`h4`} sx={{ mr: 3, mt: -0.5, fontFamily: 'Cambria', textDecoration: 'none', color: 'inherit', letterSpacing: '.05rem' }}>
            Your website here!
          </Typography>
          <Box sx={{flexGrow: 1}}>
            <Button onClick={() => setView('home')} sx={{ fontSize: 18,  my: 2, mr: 1, fontFamily: '-moz-initial', color: 'white' }}>
              Home
            </Button>
            <Button disabled={false && day === 0 && hour < START} onClick={() => setView('employees')} sx={{ fontSize: 18, my: 2, mr: 1, fontFamily: '-moz-initial', color: 'white' }}>
              Employees
            </Button>
            <Button disabled={story < 2} onClick={() => setView('paperwork')} sx={{ fontSize: 18, my: 2, mr: 1, fontFamily: '-moz-initial', color: 'white' }}>
              Paperwork
            </Button>
          </Box>
          <Tooltip title='Profile'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='avatar'>
                p
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem><strong>Hi</strong></MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {/*
      const [money, setMoney] = React.useState(3600);
      const [time, setTime] = React.useState(0);
      const [day, setDay] = React.useState(0);
      const [totalLOC, setTotalLOC] = React.useState(0);
      const [totalProjects, setTotalProjects] = React.useState(0);
      const [totalPapers, setTotalPapers] = React.useState(0);
      const [projects, setProjects] = React.useState([]);
      const [currentProject, setCurrentProject] = React.useState(null);
      */}
      {
        view === 'home' ?
        <Home
          money={money}
          day={day}
          hour={hour}
          numEmployees={numEmployees}
          maxEmployees={maxEmployees}
          totalLOC={totalLOC}
          totalProjects={totalProjects}
          setTotalProjects={setTotalProjects}
          totalPapers={totalPapers}
          currentProject={currentProject}
          projects={projects}
          setProjects={setProjects}
          brightnessMode={brightnessMode}
        /> :
        view === 'employees' ?
        <Employees
          employees={employees}
          setEmployees={setEmployees}
          numEmployees={numEmployees}
          maxEmployees={maxEmployees}
          numFrontend={numFrontend}
          setNumFrontend={setNumFrontend}
          numBackend={numBackend}
          setNumBackend={setNumBackend}
          numFrontendLOC={numFrontendLOC}
          setNumFrontendLOC={setNumFrontendLOC}
          numBackendLOC={numBackendLOC}
          setNumBackendLOC={setNumBackendLOC}
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          handleAddApplication={handleAddApplication}
          handleCloseAddedForm={handleCloseAddedForm}
          papers={papers}
          totalProjects={totalProjects}
          setFireMe={setFireMe}
          numHireForms={numHireForms}
        /> :
        <Paperwork
          papers={papers}
          setPapers={setPapers}
          setRewardForm={setRewardForm}
          totalPapers={totalPapers}
          setTotalPapers={setTotalPapers}
          brightnessMode={brightnessMode}
        />
      }

      <AppBar aria-label='console' position='fixed' color='secondary' sx={{ width: 450, top: 'auto', bottom: 0, right: 0, mr: 5, mb: 3 }}>
        <Toolbar>
          <Accordion expanded={openMessages} sx={{width: 430}}>
          <AccordionSummary onClick={() => setOpenMessages(!openMessages)} expandIcon={<ExpandMoreIcon />} >
            <Typography>Notifications</Typography>
            <Badge sx={{ml: 1}} badgeContent={messages.length} color='primary'>
              <MessageIcon />
            </Badge>
          </AccordionSummary>
          <Messages
            messages={messages}
            setMessages={setMessages}
            time={globalTime}
          />
        </Accordion>
        </Toolbar>
      </AppBar>

      <Snackbar open={addedForm} autoHideDuration={2000} onClose={handleCloseAddedForm}>
        <Alert onClose={handleCloseAddedForm} severity="success" sx={{ width: '100%' }}>
          {snackbarSuccessMsg}
        </Alert>
      </Snackbar>

      <Snackbar open={addedProj} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} autoHideDuration={2000} onClose={handleCloseAddedProj}>
        <Alert onClose={handleCloseAddedProj} severity="success" sx={{ width: '100%' }}>
          Project completed!
        </Alert>
      </Snackbar>

    </Container>
    </ThemeProvider>
  );
}