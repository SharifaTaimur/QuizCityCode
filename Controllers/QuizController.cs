﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuizCodeN.Controllers
{
    public class QuizController : Controller
    {
        // GET: Quiz
        public ActionResult StartQuiz()
        {
            return View();
        }
    }
}