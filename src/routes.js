import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import AdminLoginPage from './components/admin/AdminLoginPage';
import UserLoginPage from './components/user/UserLoginPage';
import AdminOperationsPage from './components/admin/AdminOperationsPage';
import UserExamPage from './components/user/UserExamPage';
import UserSampleExam from './components/user/UserSampleExam';
import ExamCompleted from './components/user/ExamCompleted';
import SuperAdminOperations from './components/admin/SuperAdminOperations';

export default(
    <Route path="/" component = {App}>
    <IndexRoute component = {AdminLoginPage}/>
    <Route path="userLoginPage" component = {UserLoginPage}/>    
    <Route path="adminOperationsPage" component = {AdminOperationsPage}/>
    <Route path="userExamPage" component = {UserExamPage}/>
    <Route path="userSampleExam" component = {UserSampleExam}/>
    <Route path = "ExamCompleted" component = {ExamCompleted}/>
    <Route path = "SuperAdminOperations" component = {SuperAdminOperations}/>
    </Route>
);
// <IndexRoute component = {UserLoginPage}/>
//<Route path="admin" component = {AdminLoginPage}/>