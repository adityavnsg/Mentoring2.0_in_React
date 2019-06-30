export const properties = {
    admin_login_url: "http://10.126.178.60:8087/onlineMentoringTool/admin/authenticate?username=",
    password_generate_api : "http://10.126.178.60:8087/onlineMentoringTool/admin/generatepassword",
    generate_report_api : 'http://10.126.178.60:8087/onlineMentoringTool/admin/generatereport',
    //create_admin_api : "http://10.126.178.60:8087/onlineMentoringTool/admin/createadmin?username=", 
    create_admin_api : "http://10.126.178.60:8087/onlineMentoringTool/superadmin/createadmin",
    //show_admins_list : "http://10.126.178.60:8087/onlineMentoringTool/admin/showadmins",
    show_admins_list : "http://10.126.178.60:8087/onlineMentoringTool/superadmin/showadmins",
    get_topics_api : "http://10.126.178.60:8087/onlineMentoringTool/examinee/questionsGenerator/topic?stream=",
    exam_submit : 'http://10.126.178.60:8087/onlineMentoringTool/examinee/submit',
    examinee_login : 'http://10.126.178.60:8087/onlineMentoringTool/examinee/authenticate?sapid=',
    remove_admin : 'http://10.126.178.60:8087/onlineMentoringTool/superadmin/removeadmin',
    user_exam_page :`/userExamPage`,
    user_sample_exam_page : `/userSampleExam`,
    exam_completed_page : `/ExamCompleted`,
    logut_redirect_page : "http://10.126.178.129:3000/",
    user_finder_api : "http://10.126.178.60:8087/superadmin/usernamefinder?username="
};