
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const PROGRAM = {"phase1":[{"day":1,"title":"اليوم الأول: سحب ( ظهر + باي + أكتاف خلفي )","exercises":[{"num":"١","name":"عقلة","video":"https://youtu.be/hLw8DPP7b-4"},{"num":"٢","name":"تي-بار ضيق","video":"https://youtu.be/LPVLiYWjyKg"},{"num":"٣","name":"سحب مسطرة","video":"https://youtu.be/jXRoh-W4Kqw"},{"num":"٤","name":"حبل أكتاف خلفي","video":"https://youtu.be/byptEL33K8Y"},{"num":"٥","name":"جهاز أكتاف خلفي","video":"https://youtu.be/evfADz6GUCc"},{"num":"٦","name":"بنش مرتفع بايسبس","video":"https://youtu.be/aTYlqC_JacQ"},{"num":"٧","name":"جهاز باي ضيق","video":"https://youtu.be/u6fc-b5wYF4"}],"weeks":[{"label":"الاسبوع الأول","sets":[{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثاني","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثالث","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الرابع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الخامس","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع السادس","sets":[{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"1-2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"}]}]},{"day":2,"title":"اليوم الثاني:دفع ( صدر + تراي + أكتاف )","exercises":[{"num":"١","name":"بار عالي","video":"https://youtu.be/qTzQVlVfhsQ"},{"num":"٢","name":"دامبل دفع","video":"https://youtu.be/kNnC9wWAGOQ"},{"num":"٣","name":"جهاز تجميع","video":"https://youtu.be/KJvDBXrOjH0"},{"num":"٤","name":"دامبل تراي","video":"https://youtu.be/GLXgiMtlfOE"},{"num":"٥","name":"كيبل مسطرة","video":"https://youtu.be/_zgFWq1wvO4"},{"num":"٦","name":"جهاز أكتاف","video":"https://youtu.be/fvorj7QCaac"},{"num":"٧","name":"دامبل أكتاف جانبي جالس","video":"https://youtu.be/UBx6cwLrsEE"}],"weeks":[{"label":"الاسبوع الأول","sets":[{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثاني","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثالث","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الرابع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الخامس","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع السادس","sets":[{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"1-2"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"}]}]},{"day":3,"title":"اليوم الثالث: جزء سفلي ( رجلين + معده  )","exercises":[{"num":"١","name":"جهاز دفع","video":"https://youtu.be/15HOP8ohU60"},{"num":"٢","name":"لنجز","video":"https://youtu.be/wrwwXE_x-pQ"},{"num":"٣","name":"دامبل ددلفت روم","video":"https://youtu.be/dgdxrmXJE6I"},{"num":"٤","name":"رفرفة خلفي منسدح","video":"https://youtu.be/OE_IE5eiYGc"},{"num":"٥","name":"بطات جالس","video":"https://youtu.be/n25SsbAyMV4"},{"num":"٦","name":"جهاز معده","video":"https://youtu.be/_O1xunCfYEM"},{"num":"٧","name":"بلانك","video":"https://youtu.be/Q20K8nwbxN0"}],"weeks":[{"label":"الاسبوع الأول","sets":[{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"Failure","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثاني","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"Failure","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثالث","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"Failure","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الرابع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"Failure","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الخامس","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"Failure","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع السادس","sets":[{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"1-2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"Failure","rest":"0:30-1:00","rir":"0-1"}]}]},{"day":4,"title":"اليوم الرابع: جزء علوي","exercises":[{"num":"١","name":"جهاز مستوي جالس","video":"https://youtu.be/NwzUje3z0qY"},{"num":"٢","name":"دامبل تجميع","video":"https://youtu.be/sHCg4QIw1uQ"},{"num":"٣","name":"كيبل سحب واسع","video":"https://youtu.be/amgXq2ThD0c"},{"num":"٤","name":"كيبل بايسبس","video":"https://youtu.be/fV9BpknCjGM"},{"num":"٥","name":"جهاز تجديف واسع","video":"https://youtu.be/_FrrYQxA6kc"},{"num":"٦","name":"جهاز أكتاف جانبي","video":"https://youtu.be/92drnZ4maWI"},{"num":"٧","name":"دبس للتراي","video":"https://youtu.be/QB798EnRq_4"}],"weeks":[{"label":"الاسبوع الأول","sets":[{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الثاني","sets":[{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الثالث","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الرابع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الخامس","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع السادس","sets":[{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"1-2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"1-2"}]}]},{"day":5,"title":"اليوم الخامس: جزء سفلي ( رجلين + معده ومثلثات )","exercises":[{"num":"١","name":"جهاز هاك سكوات","video":"https://youtu.be/EV5kZrHnVbM"},{"num":"٢","name":"رفرفة امامي","video":"https://youtu.be/d4LEzUALIOw"},{"num":"٣","name":"ددلفت ستف","video":"https://youtu.be/CN_7cz3P-1U"},{"num":"٤","name":"رفرفة خلفي جالس","video":"https://youtu.be/9rLXQd6KBJ8"},{"num":"٥","name":"بطات واقف","video":"https://youtu.be/SG1-FJqIjRU"},{"num":"٦","name":"بنش منخفض معده","video":"https://youtu.be/hKii-SQ-hjc"},{"num":"٧","name":"دامبل مثلثات","video":"https://youtu.be/_t3lrPI6Ns4"}],"weeks":[{"label":"الاسبوع الأول","sets":[{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الثاني","sets":[{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الثالث","sets":[{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الرابع","sets":[{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الخامس","sets":[{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع السادس","sets":[{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"1-2"}]}]}],"phase2":[{"day":1,"title":"اليوم الأول: سحب","exercises":[{"num":"١","name":"عقلة","video":null},{"num":"٢","name":"تي-بار ضيق","video":null},{"num":"٣","name":"سحب مسطرة","video":null},{"num":"٤","name":"حبل أكتاف خلفي","video":null},{"num":"٥","name":"جهاز أكتاف خلفي","video":null},{"num":"٦","name":"بنش مرتفع بايسبس","video":null},{"num":"٧","name":"جهاز باي ضيق","video":null}],"weeks":[{"label":"الاسبوع السابع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثامن","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع التاسع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع العاشر","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الحادي عشر","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثاني عشر","sets":[{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"1-2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"}]}]},{"day":2,"title":"اليوم الثاني: دفع","exercises":[{"num":"١","name":"بار عالي","video":null},{"num":"٢","name":"دامبل دفع","video":null},{"num":"٣","name":"جهاز تجميع","video":null},{"num":"٤","name":"دامبل تراي","video":null},{"num":"٥","name":"كيبل مسطرة","video":null},{"num":"٦","name":"جهاز أكتاف","video":null},{"num":"٧","name":"دامبل أكتاف جانبي جالس","video":null}],"weeks":[{"label":"الاسبوع السابع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثامن","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع التاسع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع العاشر","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الحادي عشر","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثاني عشر","sets":[{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"1-2"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"}]}]},{"day":3,"title":"اليوم الثالث: جزء سفلي","exercises":[{"num":"١","name":"جهاز دفع","video":null},{"num":"٢","name":"لنجز","video":null},{"num":"٣","name":"دامبل ددلفت روم","video":null},{"num":"٤","name":"رفرفة خلفي منسدح","video":null},{"num":"٥","name":"بطات جالس","video":null},{"num":"٦","name":"جهاز معده","video":null},{"num":"٧","name":"بلانك","video":null}],"weeks":[{"label":"الاسبوع السابع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"Failure","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثامن","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"Failure","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع التاسع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"Failure","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع العاشر","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"Failure","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الحادي عشر","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"Failure","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"}]},{"label":"الاسبوع الثاني عشر","sets":[{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"1-2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"Failure","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"}]}]},{"day":4,"title":"اليوم الرابع: جزء علوي","exercises":[{"num":"١","name":"جهاز مستوي جالس","video":null},{"num":"٢","name":"دامبل تجميع","video":null},{"num":"٣","name":"كيبل سحب واسع","video":null},{"num":"٤","name":"كيبل بايسبس","video":null},{"num":"٥","name":"جهاز تجديف واسع","video":null},{"num":"٦","name":"جهاز أكتاف جانبي","video":null},{"num":"٧","name":"دبس للتراي","video":null}],"weeks":[{"label":"الاسبوع السابع","sets":[{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الثامن","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع التاسع","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع العاشر","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الحادي عشر","sets":[{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الثاني عشر","sets":[{"sets":"3","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"1-2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"1-2"}]}]},{"day":5,"title":"اليوم الخامس: جزء سفلي","exercises":[{"num":"١","name":"جهاز هاك سكوات","video":null},{"num":"٢","name":"رفرفة امامي","video":null},{"num":"٣","name":"ددلفت ستف","video":null},{"num":"٤","name":"رفرفة خلفي جالس","video":null},{"num":"٥","name":"بطات واقف","video":null},{"num":"٦","name":"بنش منخفض معده","video":null},{"num":"٧","name":"دامبل مثلثات","video":null}],"weeks":[{"label":"الاسبوع السابع","sets":[{"sets":"3","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الثامن","sets":[{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع التاسع","sets":[{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع العاشر","sets":[{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الحادي عشر","sets":[{"sets":"4","reps":"10-12","rest":"1:30-2:00","rir":"2"},{"sets":"3","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"7-10","rest":"1:30-2:00","rir":"2"},{"sets":"4","reps":"12-15","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"0-1"},{"sets":"4","reps":"10-12","rest":"1:00-2:00","rir":"1-2"}]},{"label":"الاسبوع الثاني عشر","sets":[{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"7-10","rest":"0:30-1:00","rir":"2"},{"sets":"2","reps":"12-15","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"0-1"},{"sets":"2","reps":"10-12","rest":"0:30-1:00","rir":"1-2"}]}]}]};
const META = {"profile":{"subscription":"محسنات الأداء","job":"مساعد مهندس","tools":"نادي كامل","experience":"أكثر من ٣ سنوات","activity":"-","goal":"زيادة الكتلة العضلية","trainingDays":5,"weight":65,"height":171,"age":30,"weeklySteps":70000,"weeklyCalories":19950,"cardio":"العدد: 2   |   النوعية: غزالة أو درج شدة 7-10   |   المدة: 30 دقيقة","dailySteps":10000,"dailyCalories":"2800-2900","fiber":"25-30g","fat":"65-70g","carbs":"399-403g","protein":"155-160g","coachName":"راشد الناجم","clientName":"تركي فهد المطيري"},"meals":[{"category":"وجبات منزلية","items":[{"name":"4 Eggs","cal":288,"protein":25,"netCarb":2,"fat":19,"fiber":0},{"name":"Greek Yogurt with Milk, Oats & Honey","cal":390,"protein":26,"netCarb":52,"fat":7,"fiber":4},{"name":"Rice (100g)","cal":130,"protein":2,"netCarb":28,"fat":0,"fiber":0.4}]},{"category":"وجبات Diet Station","items":[{"name":"Chicken Garfalo Pasta","cal":590,"protein":56,"netCarb":51,"fat":17,"fiber":3},{"name":"Lebanese Dawood Basha","cal":690,"protein":58,"netCarb":45,"fat":31,"fiber":3},{"name":"Herbed Fish w/ Sabzi Rice","cal":610,"protein":64,"netCarb":47,"fat":16,"fiber":2},{"name":"Beef Uzbeki Rice","cal":600,"protein":55,"netCarb":47,"fat":20,"fiber":2},{"name":"Keto Malay Chicken Tikka","cal":370,"protein":53,"netCarb":2,"fat":15,"fiber":0},{"name":"Spicy Chicken Sandwich","cal":490,"protein":51,"netCarb":7,"fat":28,"fiber":1},{"name":"Vine Leaves Pasta","cal":270,"protein":7,"netCarb":46,"fat":7,"fiber":3},{"name":"Grilled Chicken with Spicy Tangi Rice","cal":550,"protein":51,"netCarb":47,"fat":15,"fiber":2},{"name":"Spicy Char-grilled Chicken with Sweet Potato","cal":490,"protein":50,"netCarb":41,"fat":10,"fiber":4},{"name":"Chicken Kabab with Tahini Sauce & Potato Wedges","cal":520,"protein":45,"netCarb":47,"fat":16,"fiber":4},{"name":"Shrimps Fried with Vegetable","cal":310,"protein":41,"netCarb":5,"fat":13,"fiber":2},{"name":"Baked Zucchini With Beef","cal":410,"protein":49,"netCarb":4,"fat":21,"fiber":2},{"name":"Chicken Chipotle Pasta","cal":600,"protein":53,"netCarb":56,"fat":16,"fiber":3},{"name":"Pesto Pasta (Plain)","cal":257,"protein":5,"netCarb":40,"fat":2,"fiber":2},{"name":"Chicken Spinach Lasagna","cal":590,"protein":48,"netCarb":53,"fat":18,"fiber":4},{"name":"Mexican Rice with Corn & Cheese","cal":340,"protein":18,"netCarb":67,"fat":8,"fiber":4},{"name":"Mediterranean Beef Burger","cal":540,"protein":51,"netCarb":35,"fat":21,"fiber":3},{"name":"Halloumi Cheese Burger","cal":420,"protein":35,"netCarb":32,"fat":17,"fiber":2},{"name":"Chicken Burger Sundried Tomato Bun","cal":470,"protein":47,"netCarb":34,"fat":14,"fiber":2},{"name":"Hawaiian BBQ Beef Wrap","cal":330,"protein":17,"netCarb":34,"fat":13,"fiber":2},{"name":"Mongolian Meat Tikka with Potato Wedges","cal":540,"protein":49,"netCarb":36,"fat":21,"fiber":4},{"name":"Chicken Malay Tikka with Potato Cubes","cal":580,"protein":60,"netCarb":42,"fat":16,"fiber":4},{"name":"Buffalo Chicken Wrap","cal":360,"protein":23,"netCarb":38,"fat":12,"fiber":2},{"name":"B.B.Q Chicken Burger","cal":420,"protein":45,"netCarb":36,"fat":11,"fiber":2},{"name":"Beef Asparagus with Calrose Rice","cal":578,"protein":66,"netCarb":43,"fat":21,"fiber":3},{"name":"Maki-Chicken Quinoa","cal":442,"protein":20,"netCarb":40,"fat":18,"fiber":5},{"name":"Chicken Black Pepper with Veg Rice","cal":570,"protein":50,"netCarb":52,"fat":16,"fiber":3},{"name":"Scallion Beef with Corn Mash Potato","cal":520,"protein":50,"netCarb":44,"fat":13,"fiber":4},{"name":"Biryani Red Chicken","cal":578,"protein":45,"netCarb":54,"fat":16,"fiber":2},{"name":"Biryani - Red Shrimp","cal":480,"protein":34,"netCarb":57,"fat":11,"fiber":2},{"name":"Kibba Bel Laban","cal":491,"protein":43,"netCarb":47,"fat":13,"fiber":5},{"name":"Chicken Asparagus with Egyptian Rice","cal":540,"protein":49,"netCarb":48,"fat":15,"fiber":3},{"name":"Chicken Fajita Pizza","cal":220,"protein":20,"netCarb":21,"fat":6,"fiber":2},{"name":"Sesame Chicken & Baked Potato","cal":547,"protein":56,"netCarb":45,"fat":13,"fiber":4},{"name":"Grilled Red Chicken (with Rice)","cal":552,"protein":58,"netCarb":52,"fat":11,"fiber":2},{"name":"Chicken Vegi","cal":572,"protein":47,"netCarb":54,"fat":10,"fiber":5},{"name":"Kushari","cal":245,"protein":15,"netCarb":57,"fat":4,"fiber":6},{"name":"Lemon Pepper Chicken Pasta","cal":590,"protein":50,"netCarb":52,"fat":19,"fiber":3},{"name":"Kabab Kashkahsh","cal":682,"protein":54,"netCarb":60,"fat":23,"fiber":3},{"name":"Grilled Shrimps With Veg","cal":370,"protein":48,"netCarb":5,"fat":16,"fiber":3},{"name":"Simple Shrimp Jambalaya","cal":470,"protein":43,"netCarb":44,"fat":12,"fiber":2},{"name":"Lemon Chicken Risotto","cal":520,"protein":47,"netCarb":45,"fat":15,"fiber":2},{"name":"Mix Herb Chicken Pasta","cal":540,"protein":50,"netCarb":48,"fat":14,"fiber":3},{"name":"Creamy Chicken with Violate Rice","cal":520,"protein":42,"netCarb":59,"fat":12,"fiber":2}]},{"category":"سلطات وشوربات Diet Station","items":[{"name":"Cucumber Yogurt Salad","cal":105,"protein":6,"netCarb":12,"fat":3,"fiber":2},{"name":"Nachos Salad","cal":100,"protein":3,"netCarb":15,"fat":3,"fiber":3},{"name":"Chicken Ranch Salad","cal":100,"protein":9,"netCarb":10,"fat":2,"fiber":3},{"name":"Rocca Walnut Cheese Salad","cal":170,"protein":13,"netCarb":14,"fat":8,"fiber":3},{"name":"Tabboula with Quinoa Salad","cal":180,"protein":4,"netCarb":7,"fat":16,"fiber":4},{"name":"Soup - Lentil and Vermicelli","cal":101,"protein":3,"netCarb":7,"fat":5,"fiber":5},{"name":"Greek Lemon Chicken Soup","cal":70,"protein":5,"netCarb":4,"fat":3,"fiber":1},{"name":"Pineapple Cucumber Feta Salad","cal":180,"protein":3,"netCarb":6,"fat":16,"fiber":2},{"name":"Fattoush Salad","cal":68,"protein":3,"netCarb":10,"fat":1,"fiber":4},{"name":"Lentil Soup","cal":60,"protein":3,"netCarb":6,"fat":0,"fiber":5},{"name":"Sweet Corn Chicken Soup","cal":50,"protein":5,"netCarb":5,"fat":2,"fiber":1},{"name":"Rocca Chicken Pasta salad","cal":190,"protein":15,"netCarb":10,"fat":10,"fiber":2},{"name":"Dates & Fig Salad","cal":250,"protein":4,"netCarb":28,"fat":16,"fiber":5},{"name":"Zatar Salad","cal":150,"protein":4,"netCarb":13,"fat":8,"fiber":3},{"name":"Beetroot Feta Salad","cal":108,"protein":4,"netCarb":5,"fat":8,"fiber":2},{"name":"Rocca & Mango Salad","cal":106,"protein":7,"netCarb":11,"fat":3,"fiber":3},{"name":"Pasta Salad","cal":100,"protein":4,"netCarb":8,"fat":5,"fiber":2},{"name":"Mexican Caesar Salad","cal":130,"protein":4,"netCarb":12,"fat":7,"fiber":4},{"name":"Rocca Apple Salad","cal":78,"protein":1,"netCarb":5,"fat":5,"fiber":2},{"name":"Hummus Fatteh","cal":170,"protein":6,"netCarb":12,"fat":10,"fiber":4},{"name":"Rocca Ninjin Crispy Salad","cal":180,"protein":11,"netCarb":20,"fat":6,"fiber":3},{"name":"Soup - Mushroom","cal":60,"protein":1,"netCarb":2,"fat":5,"fiber":1},{"name":"Chicken Noodle soup","cal":70,"protein":6,"netCarb":2,"fat":4,"fiber":1},{"name":"Pesto Orzo & Arugula Salad","cal":250,"protein":7,"netCarb":22,"fat":14,"fiber":2}]},{"category":"سناكات Diet Station","items":[{"name":"Raspberry Cheese Dessert","cal":170,"protein":5,"netCarb":4,"fat":14,"fiber":1},{"name":"DS Choco Crispy Rice Cake","cal":200,"protein":6,"netCarb":33,"fat":7,"fiber":1},{"name":"Choco Chip Cookies","cal":210,"protein":5,"netCarb":31,"fat":7,"fiber":1},{"name":"Pumpkin Magic Latte","cal":120,"protein":5,"netCarb":22,"fat":2,"fiber":1},{"name":"Orange Juice-Fresh","cal":90,"protein":1,"netCarb":20.5,"fat":0,"fiber":0.5},{"name":"Carrot & Orange Juice","cal":90,"protein":1,"netCarb":19.5,"fat":0,"fiber":0.5},{"name":"Laban with Mint","cal":50,"protein":4,"netCarb":8,"fat":1,"fiber":0},{"name":"Flourless Cake","cal":260,"protein":6,"netCarb":6,"fat":24,"fiber":1},{"name":"Strawberry Chia Pudding","cal":100,"protein":2,"netCarb":1,"fat":8,"fiber":4},{"name":"Dark Chocolate Crunchy Nuts","cal":270,"protein":5,"netCarb":6,"fat":23,"fiber":3},{"name":"DS Cinnamon Roll","cal":110,"protein":2,"netCarb":13,"fat":6,"fiber":1},{"name":"Mango Strawberry Fruit Salad","cal":80,"protein":1,"netCarb":18,"fat":0,"fiber":3},{"name":"Fruit Salad","cal":70,"protein":2,"netCarb":15,"fat":1,"fiber":2},{"name":"Orange Fruit","cal":80,"protein":1,"netCarb":17,"fat":0,"fiber":3},{"name":"Edamame","cal":165,"protein":15,"netCarb":13,"fat":5,"fiber":5},{"name":"Nuts","cal":170,"protein":5,"netCarb":3,"fat":15,"fiber":2},{"name":"Lotus Cheese Cake","cal":210,"protein":5,"netCarb":24,"fat":13,"fiber":1},{"name":"Matcha Frapee","cal":100,"protein":6,"netCarb":12,"fat":3,"fiber":1},{"name":"Roasted Cauliflower w/ Ranch Tahina Dressing","cal":240,"protein":7,"netCarb":8,"fat":19,"fiber":4}]},{"category":"سناكات","items":[{"name":"1 Bannana 1tbsp Peanut butter 1 scoop Protein","cal":309,"protein":30,"netCarb":27,"fiber":5,"fat":9},{"name":"ISO100 Scoop with Milk","cal":260,"protein":33,"netCarb":13,"fat":8,"fiber":0},{"name":"Vitargo Scoop","cal":140,"protein":0,"netCarb":35,"fat":0,"fiber":0}]},{"category":"مطاعم أخرى","items":[{"name":"McChicken","cal":410,"protein":17,"netCarb":45,"fiber":2,"fat":18},{"name":"Flat bread (eggs and turkey) American cheese","cal":504,"protein":30,"netCarb":42,"fiber":1,"fat":24},{"name":"Mongolian Beef (P.F. Chang's) - White Rice + Extra Beef","cal":1100,"protein":81,"netCarb":89,"fat":45,"fiber":2}]}]};


const ARABIC_NUM = {
  "٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9",
  "۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9",
};
function toEnNum(value) {
  if (value == null) return value;
  return String(value).replace(/[٠-٩۰-۹]/g, digit => ARABIC_NUM[digit]);
}
function formatEnNumber(value) {
  if (value == null || value === "") return value;
  const normalized = toEnNum(value);
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric.toLocaleString("en-US") : normalized;
}

const EX_TR = {"بار عالي":"High Bar Press","بطات جالس":"Seated Calf Raise","بطات واقف":"Standing Calf Raise","بلانك":"Plank","بنش مرتفع بايسبس":"Incline Bicep Bench","بنش منخفض معده":"Decline Bench Abs","تي-بار ضيق":"T-Bar Row (Close Grip)","جهاز أكتاف":"Shoulder Press Machine","جهاز أكتاف جانبي":"Lateral Raise Machine","جهاز أكتاف خلفي":"Rear Delt Machine","جهاز باي ضيق":"Close-Grip Bicep Machine","جهاز تجديف واسع":"Wide Row Machine","جهاز تجميع":"Pec Deck Fly","جهاز دفع":"Leg Press","جهاز مستوي جالس":"Machine Chest Press","جهاز معده":"Ab Machine","جهاز هاك سكوات":"Hack Squat","حبل أكتاف خلفي":"Rope Rear Delt Pull","دامبل أكتاف جانبي جالس":"Seated DB Lateral Raise","دامبل تجميع":"Dumbbell Fly","دامبل تراي":"DB Tricep Extension","دامبل ددلفت روم":"DB Romanian Deadlift","دامبل دفع":"Dumbbell Press","دامبل مثلثات":"Dumbbell Shrugs","دبس للتراي":"Tricep Dips","ددلفت ستف":"Stiff-Leg Deadlift","رفرفة امامي":"Leg Extension","رفرفة خلفي جالس":"Seated Leg Curl","رفرفة خلفي منسدح":"Lying Leg Curl","سحب مسطرة":"Straight-Arm Pulldown","عقلة":"Pull-up","كيبل بايسبس":"Cable Bicep Curl","كيبل سحب واسع":"Wide Grip Pulldown","كيبل مسطرة":"Cable Tricep Pushdown","لنجز":"Lunges"};

const DAY_TR = {"اليوم الأول: سحب ( ظهر + باي + أكتاف خلفي )":"Day 1: Pull (Back, Biceps, Rear Delts)","اليوم الأول: سحب":"Day 1: Pull","اليوم الثاني:دفع ( صدر + تراي + أكتاف )":"Day 2: Push (Chest, Triceps, Shoulders)","اليوم الثاني: دفع":"Day 2: Push","اليوم الثالث: جزء سفلي ( رجلين + معده  )":"Day 3: Lower Body (Legs, Abs)","اليوم الثالث: جزء سفلي":"Day 3: Lower Body","اليوم الرابع: جزء علوي":"Day 4: Upper Body","اليوم الخامس: جزء سفلي ( رجلين + معده ومثلثات )":"Day 5: Lower Body (Legs, Abs, Traps)","اليوم الخامس: جزء سفلي":"Day 5: Lower Body"};

const MEAL_CAT_TR = {"وجبات منزلية":"Home Meals","وجبات McDonald's":"McDonald's","وجبات Subway":"Subway","سناكات":"Snacks","وجبات Diet Station":"Diet Station","مطاعم أخرى":"Other Restaurants","سلطات وشوربات Diet Station":"Diet Station Salads & Soups","سناكات Diet Station":"Diet Station Snacks"};

const COLORS = {
  canvas: "#343434", bg: "#101012", surface: "#18191B", surface2: "#202124", surface3: "#28292D",
  line: "#34353A", text: "#F3F0E8", muted: "#A0A1A5", mutedDim: "#66686E",
  gold: "#D7AD2B", goldDim: "#8F7420", green: "#659675", rust: "#B86A50", blue: "#8B8D92", red: "#E0483E",
};

function Ring({ pct, size = 64, stroke = 7, color = COLORS.gold, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, pct || 0));
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={COLORS.surface3} strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={c - clamped * c} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
    </div>
  );
}

/* Editable text/number bound to the overrides store. When editMode is off it's plain text;
   when on, it becomes an inline input. Edits are language-independent (what you type is what shows). */
function Ed({ id, fallback, editMode, overrides, setOverride, style, width, tag = "span" }) {
  const val = toEnNum(overrides[id] !== undefined ? overrides[id] : fallback);
  if (!editMode) {
    const Tag = tag;
    return <Tag style={style}>{val}</Tag>;
  }
  return (
    <input
      value={val}
      onChange={e => setOverride(id, toEnNum(e.target.value))}
      style={{
        ...style, background: COLORS.surface2, border: `1px solid ${COLORS.gold}`, borderRadius: 6,
        padding: "2px 6px", width: width || `${Math.max(3, val.length)}ch`, fontFamily: "inherit", color: COLORS.text,
      }}
    />
  );
}

const TABS = [
  { key: "home", ar: "الرئيسية", en: "Home", icon: "home" },
  { key: "workout", ar: "التمرين", en: "Workout", icon: "workout" },
  { key: "followup", ar: "المتابعة", en: "Progress", icon: "progress" },
  { key: "menu", ar: "المنيو", en: "Menu", icon: "menu" },
];

function NavIcon({ name, size = 22 }) {
  const shapes = {
    home: (
      <path d="M12 3.5 3.5 11h2v8.5a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20.5h3.5a1 1 0 0 0 1-1V11h2z" />
    ),
    workout: (
      <g>
        <rect x="10.2" y="11" width="3.6" height="2" rx="0.8" />
        <rect x="7.2" y="9" width="1.6" height="6" rx="0.8" />
        <rect x="5" y="7.2" width="2" height="9.6" rx="1" />
        <rect x="2.6" y="8.5" width="1.4" height="7" rx="0.7" />
        <rect x="15.2" y="9" width="1.6" height="6" rx="0.8" />
        <rect x="17" y="7.2" width="2" height="9.6" rx="1" />
        <rect x="20" y="8.5" width="1.4" height="7" rx="0.7" />
      </g>
    ),
    progress: (
      <g>
        <rect x="4" y="12.5" width="3.6" height="7.5" rx="1.2" />
        <rect x="10.2" y="8" width="3.6" height="12" rx="1.2" />
        <rect x="16.4" y="4" width="3.6" height="16" rx="1.2" />
      </g>
    ),
    menu: (
      <g>
        <path d="M6.2 3a.7.7 0 0 1 .7.7v5.6h.7V3.7a.7.7 0 0 1 1.4 0v5.6h.7V3.7a.7.7 0 0 1 1.4 0v6.5a1.6 1.6 0 0 1-1.3 1.57V20.3a.9.9 0 0 1-1.8 0v-8.53A1.6 1.6 0 0 1 6.2 10.2V3.7a.7.7 0 0 1 0-.7z" />
        <path d="M17.6 3a.9.9 0 0 1 .9.9v16.4a.9.9 0 0 1-1.8 0v-7.1c-1.4-.6-2.4-2.2-2.4-4.6C14.3 5.2 15.6 3 17.6 3Z" />
      </g>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
      {shapes[name]}
    </svg>
  );
}

function MealIcon({ name, size = 20 }) {
  const shapes = {
    breakfast: (
      <g>
        <path d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
        <path d="M16 9.5h1.3a2.3 2.3 0 0 1 0 4.6H16v-1.6h1.3a.7.7 0 0 0 0-1.4H16Z" />
      </g>
    ),
    lunch: (
      <g>
        <path d="M3 10.8 12 5l9 5.8v1.2H3Z" />
        <rect x="3" y="12.8" width="18" height="2" rx="1" />
        <path d="M4 16.3h16l-1.6 3.1a2 2 0 0 1-1.8 1.1H7.4a2 2 0 0 1-1.8-1.1Z" />
      </g>
    ),
    dinner: (
      <g>
        <path d="M3 15.3a9 6 0 0 1 18 0v.5H3Z" />
        <rect x="11" y="4" width="2" height="3.2" rx="1" />
        <rect x="2.3" y="16.8" width="19.4" height="2" rx="1" />
      </g>
    ),
    snacks: (
      <g>
        <rect x="8.3" y="5" width="7.4" height="4" rx="1" />
        <path d="M6.5 9h11l-.9 10.3a2 2 0 0 1-2 1.7H9.4a2 2 0 0 1-2-1.7Z" />
      </g>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
      {shapes[name]}
    </svg>
  );
}

function SectionTitle({ eyebrow, title, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
      <div>
        {eyebrow && <div style={{ fontSize: 12, color: COLORS.gold, letterSpacing: 0.5, marginBottom: 4 }}>{eyebrow}</div>}
        <div style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 20, color: COLORS.text }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

const STORAGE_KEY = "turki-program-progress-v2";
const TOTAL_WEEKS = 12;

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { if (window.console) console.error(error, info); }
  render() {
    if (this.state.error) {
      return (
        <div dir="ltr" style={{ background: COLORS.bg, color: "#E6A28D", minHeight: "50vh", padding: 20, fontFamily: "monospace", fontSize: 12, whiteSpace: "pre-wrap", textAlign: "left" }}>
          <div style={{ color: COLORS.gold, fontWeight: 800, marginBottom: 10, fontFamily: "'Cairo', sans-serif", fontSize: 15 }}>حدث خطأ في التطبيق — Something broke</div>
          {String((this.state.error && this.state.error.message) || this.state.error)}
          {"\n\n"}
          {this.state.error && this.state.error.stack ? String(this.state.error.stack) : ""}
          <div style={{ marginTop: 16 }}>
            <button onClick={() => this.setState({ error: null })} style={{ background: COLORS.gold, color: "#1a1508", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 800, cursor: "pointer" }}>حاول مرة ثانية</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function emptyFollowup() {
  const weeks = {};
  for (let i = 1; i <= TOTAL_WEEKS; i++) weeks[i] = { weight: "", calories: "", protein: "", steps: "" };
  return weeks;
}

function getLatestScheduleWeek(followup) {
  for (let week = TOTAL_WEEKS; week >= 1; week--) {
    const entry = followup?.[week];
    if (entry && Object.values(entry).some(value => String(value ?? "").trim() !== "")) return week;
  }
  return null;
}

function isDayDoneAt(workoutLogs, phase, weekIdx, dayIdx, exerciseCount) {
  if (exerciseCount === 0) return false;
  for (let e = 0; e < exerciseCount; e++) {
    if (!workoutLogs[`p${phase}-w${weekIdx}-d${dayIdx}-e${e}`]?.done) return false;
  }
  return true;
}

function getDefaultWeight(workoutLogs, phase, weekIdx, dayIdx, exIdx) {
  for (let w = weekIdx - 1; w >= 0; w--) {
    const v = workoutLogs[`p${phase}-w${w}-d${dayIdx}-e${exIdx}`]?.weight;
    if (v) return v;
  }
  if (phase === 2) {
    for (let w = 5; w >= 0; w--) {
      const v = workoutLogs[`p1-w${w}-d${dayIdx}-e${exIdx}`]?.weight;
      if (v) return v;
    }
  }
  return "";
}

function getResumePoint(workoutLogs) {
  const phases = [{ phase: 1, days: PROGRAM.phase1 }, { phase: 2, days: PROGRAM.phase2 }];
  for (const { phase, days } of phases) {
    const weekCount = days[0]?.weeks?.length || 0;
    for (let weekIdx = 0; weekIdx < weekCount; weekIdx++) {
      for (let dayIdx = 0; dayIdx < days.length; dayIdx++) {
        if (!isDayDoneAt(workoutLogs, phase, weekIdx, dayIdx, days[dayIdx].exercises.length)) {
          return { phase, weekIdx, dayIdx };
        }
      }
    }
  }
  const lastWeekIdx = (PROGRAM.phase2[0]?.weeks?.length || 6) - 1;
  return { phase: 2, weekIdx: lastWeekIdx, dayIdx: PROGRAM.phase2.length - 1 };
}

function parseRestSeconds(restStr) {
  if (!restStr) return 60;
  const toSeconds = (t) => {
    const m = String(t).trim().match(/^(\d+):(\d+)$/);
    if (m) return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
    const n = parseFloat(t);
    return isNaN(n) ? null : Math.round(n * 60);
  };
  const secs = String(restStr).split("-").map(toSeconds).filter(n => n !== null);
  if (secs.length === 0) return 60;
  if (secs.length === 1) return secs[0];
  return Math.round((secs[0] + secs[1]) / 2 / 5) * 5;
}

function formatClock(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(h > 0 ? 2 : 1, "0");
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${mm}:${ss}`;
}

function parseTargetRange(str) {
  if (!str) return null;
  const nums = String(str).match(/[\d.]+/g);
  if (!nums || nums.length === 0) return null;
  const values = nums.map(Number);
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function dateKeyOf(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function todayKey() {
  return dateKeyOf(new Date());
}

function currentWeekDates() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

const MEAL_TYPES = [
  { key: "breakfast", ar: "فطور", en: "Breakfast" },
  { key: "lunch", ar: "غداء", en: "Lunch" },
  { key: "dinner", ar: "عشاء", en: "Dinner" },
  { key: "snacks", ar: "سناكات", en: "Snacks" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [loaded, setLoaded] = useState(false);
  const [workoutLogs, setWorkoutLogs] = useState({});
  const [followup, setFollowup] = useState(emptyFollowup());
  const [overrides, setOverrides] = useState({});
  const [lang, setLang] = useState("ar");
  const [exLang, setExLang] = useState("ar");
  const [sessionStarts, setSessionStarts] = useState({});
  const [sessionDurations, setSessionDurations] = useState({});
  const [foodLog, setFoodLog] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [phase, setPhase] = useState(1);
  const [weekIdx, setWeekIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [mealCat, setMealCat] = useState(0);
  const [toast, setToast] = useState(null);
  const saveTimer = useRef(null);
  const firstLoad = useRef(true);

  const T = useCallback((ar, en) => (lang === "ar" ? ar : en), [lang]);

  useEffect(() => {
    (async () => {
      let loadedWorkoutLogs = {};
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          if (parsed.workoutLogs) {
            loadedWorkoutLogs = parsed.workoutLogs;
            setWorkoutLogs(parsed.workoutLogs);
          }
          if (parsed.followup) setFollowup({ ...emptyFollowup(), ...parsed.followup });
          if (parsed.overrides) setOverrides(parsed.overrides);
          if (parsed.lang) setLang(parsed.lang);
          if (parsed.exLang) setExLang(parsed.exLang);
          if (parsed.sessionStarts) setSessionStarts(parsed.sessionStarts);
          if (parsed.sessionDurations) setSessionDurations(parsed.sessionDurations);
          if (parsed.foodLog) setFoodLog(parsed.foodLog);
        }
      } catch (e) { /* nothing saved yet */ }
      const resume = getResumePoint(loadedWorkoutLogs);
      setPhase(resume.phase);
      setWeekIdx(resume.weekIdx);
      setDayIdx(resume.dayIdx);
      setTab("workout");
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (firstLoad.current) { firstLoad.current = false; return; }
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify({ workoutLogs, followup, overrides, lang, exLang, sessionStarts, sessionDurations, foodLog }), false);
        setToast(T("تم الحفظ", "Saved"));
        setTimeout(() => setToast(null), 1100);
      } catch (e) {
        setToast(T("تعذر الحفظ", "Save failed"));
        setTimeout(() => setToast(null), 1500);
      }
    }, 700);
    return () => clearTimeout(saveTimer.current);
  }, [workoutLogs, followup, overrides, lang, exLang, sessionStarts, sessionDurations, foodLog, loaded]);

  const globalWeekNum = phase === 1 ? weekIdx + 1 : weekIdx + 7;

  const openTab = useCallback((nextTab) => {
    if (nextTab === "workout") {
      const resume = getResumePoint(workoutLogs);
      setPhase(resume.phase);
      setWeekIdx(resume.weekIdx);
      setDayIdx(resume.dayIdx);
    }
    setTab(nextTab);
  }, [workoutLogs]);

  const setExerciseLog = useCallback((exKey, updater) => {
    setWorkoutLogs(prev => {
      const cur = prev[exKey] || { weight: "", reps: [] };
      return { ...prev, [exKey]: updater(cur) };
    });
  }, []);

  const setOverride = useCallback((id, value) => {
    setOverrides(prev => ({ ...prev, [id]: value }));
  }, []);

  const startSessionIfNeeded = useCallback((dayKey) => {
    setSessionStarts(prev => (prev[dayKey] ? prev : { ...prev, [dayKey]: Date.now() }));
  }, []);

  const recordSessionDuration = useCallback((dayKey, seconds) => {
    setSessionDurations(prev => ({ ...prev, [dayKey]: seconds }));
  }, []);

  const resetDay = useCallback((p, w, d) => {
    const prefix = `p${p}-w${w}-d${d}-e`;
    setWorkoutLogs(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (k.startsWith(prefix)) delete next[k]; });
      return next;
    });
    const dayKey = `p${p}-w${w}-d${d}`;
    setSessionStarts(prev => { const next = { ...prev }; delete next[dayKey]; return next; });
    setSessionDurations(prev => { const next = { ...prev }; delete next[dayKey]; return next; });
  }, []);

  const addFoodItem = useCallback((item, dateKey) => {
    const key = dateKey || todayKey();
    const entry = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...item };
    setFoodLog(prev => ({ ...prev, [key]: [...(prev[key] || []), entry] }));
  }, []);

  const removeFoodItem = useCallback((id, dateKey) => {
    const key = dateKey || todayKey();
    setFoodLog(prev => ({ ...prev, [key]: (prev[key] || []).filter(e => e.id !== id) }));
  }, []);

  if (!loaded) {
    return (
      <div style={{ background: COLORS.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: COLORS.gold, fontFamily: "'Cairo', sans-serif", fontWeight: 800 }}>...</div>
      </div>
    );
  }

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div className="app-shell" dir={dir} style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "'Tajawal', sans-serif", paddingBottom: 84 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&family=Tajawal:wght@400;500;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        html { background: ${COLORS.canvas}; color-scheme: dark; }
        body { background: ${COLORS.canvas}; }
        button, input, textarea, select { font-variant-numeric: lining-nums tabular-nums; }
        .app-shell {
          width: min(100%, 520px);
          min-height: calc(100vh - 28px);
          margin: 28px auto 0;
          position: relative;
          box-shadow: 18px 0 0 rgba(16, 16, 18, 0.22);
        }
        @media (max-width: 520px) {
          .app-shell { min-height: 100vh; margin-top: 0; box-shadow: none; }
        }
        ::selection { background: ${COLORS.gold}; color: #1a1508; }
        input:focus, select:focus, button:focus-visible { outline: 2px solid ${COLORS.gold}; outline-offset: 1px; }
      `}</style>

      {toast && (
        <div style={{ position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)", background: COLORS.surface3, color: COLORS.gold, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, zIndex: 50, border: `1px solid ${COLORS.gold}` }}>{toast}</div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "calc(12px + env(safe-area-inset-top)) 16px 0" }}>
        <div style={{ display: "flex", background: COLORS.surface, borderRadius: 10, border: `1px solid ${COLORS.line}`, overflow: "hidden" }}>
          {["ar", "en"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: "5px 12px", border: "none", cursor: "pointer", fontWeight: 800, fontSize: 12,
              background: lang === l ? COLORS.gold : "transparent", color: lang === l ? "#1a1508" : COLORS.mutedDim,
            }}>{l === "ar" ? "AR" : "EN"}</button>
          ))}
        </div>
        <button onClick={() => setEditMode(m => !m)} style={{
          padding: "5px 14px", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 12,
          border: `1px solid ${editMode ? COLORS.green : COLORS.line}`,
          background: editMode ? "rgba(90,160,107,0.18)" : COLORS.surface, color: editMode ? COLORS.green : COLORS.mutedDim,
        }}>{editMode ? T("✓ تم", "✓ Done") : T("✎ تعديل", "✎ Edit")}</button>
      </div>

      {editMode && (
        <div style={{ margin: "8px 16px 0", background: "rgba(90,160,107,0.1)", border: `1px solid ${COLORS.green}`, borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: "#9FCBAA" }}>
          {T("وضع التعديل مفعّل — اضغط أي نص أو رقم لتغييره، والتغييرات تتحفظ تلقائياً.", "Edit mode is on — tap any text or number to change it. Changes save automatically.")}
        </div>
      )}

      <ErrorBoundary>
        {tab === "home" && <HomeTab followup={followup} T={T} editMode={editMode} overrides={overrides} setOverride={setOverride} />}
        {tab === "workout" && (
          <WorkoutTab
            phase={phase} setPhase={setPhase} weekIdx={weekIdx} setWeekIdx={setWeekIdx}
            dayIdx={dayIdx} setDayIdx={setDayIdx} workoutLogs={workoutLogs} setExerciseLog={setExerciseLog}
            globalWeekNum={globalWeekNum} T={T} editMode={editMode} overrides={overrides} setOverride={setOverride}
            exLang={exLang} setExLang={setExLang}
            sessionStarts={sessionStarts} sessionDurations={sessionDurations}
            startSessionIfNeeded={startSessionIfNeeded} recordSessionDuration={recordSessionDuration}
            resetDay={resetDay}
          />
        )}
        {tab === "followup" && <FollowupTab followup={followup} setFollowup={setFollowup} T={T} />}
        {tab === "menu" && (
          <MenuTab
            mealCat={mealCat} setMealCat={setMealCat} T={T} editMode={editMode} overrides={overrides} setOverride={setOverride}
            foodLog={foodLog} addFoodItem={addFoodItem} removeFoodItem={removeFoodItem}
          />
        )}
      </ErrorBoundary>

      <nav style={{ position: "fixed", bottom: 0, left: "50%", width: "min(100%, 520px)", transform: "translateX(-50%)", background: "rgba(24,25,27,0.96)", backdropFilter: "blur(10px)", borderTop: `1px solid ${COLORS.line}`, display: "flex", padding: "8px 6px calc(8px + env(safe-area-inset-bottom))", zIndex: 40 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => openTab(t.key)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 2px", color: tab === t.key ? COLORS.gold : COLORS.mutedDim, transition: "color 160ms ease" }}>
            <NavIcon name={t.icon} />
            <span style={{ fontSize: 11, fontWeight: 700 }}>{T(t.ar, t.en)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ---------------- HOME ---------------- */
function HomeTab({ followup, T, editMode, overrides, setOverride }) {
  const p = META.profile;
  const latestWeek = useMemo(() => getLatestScheduleWeek(followup), [followup]);
  const cur = latestWeek ? followup[latestWeek] : null;
  const weeklySteps = Number(overrides["profile.weeklySteps"] ?? p.weeklySteps);
  const weeklyCalories = Number(overrides["profile.weeklyCalories"] ?? p.weeklyCalories);
  const stepsPct = cur && cur.steps ? Number(cur.steps) / weeklySteps : 0;
  const calPct = cur && cur.calories ? Number(cur.calories) / weeklyCalories : 0;

  const ed = (id, fallback, style, width) => <Ed id={id} fallback={fallback} editMode={editMode} overrides={overrides} setOverride={setOverride} style={style} width={width} />;

  return (
    <div style={{ padding: "16px 16px 8px" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: COLORS.gold, letterSpacing: 0.5 }}>
          {T("برنامج", "Program")} {ed("profile.goal", p.goal, { fontSize: 12, color: COLORS.gold })}
        </div>
        <div style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900, fontSize: 26, marginTop: 3 }}>
          {ed("profile.clientName", p.clientName, { fontFamily: "'Cairo', sans-serif", fontWeight: 900, fontSize: 26 })}
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>
          {T("إعداد المدرب", "Coached by")} {ed("profile.coachName", p.coachName, { fontSize: 13, color: COLORS.muted })}
          {" · "}{T("اشتراك", "Plan")} {ed("profile.subscription", p.subscription, { fontSize: 13, color: COLORS.muted })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
        {[
          ["profile.weight", p.weight, T("الوزن", "Weight"), "kg"],
          ["profile.height", p.height, T("الطول", "Height"), "cm"],
          ["profile.age", p.age, T("العمر", "Age"), T("سنة", "yrs")],
          ["profile.trainingDays", p.trainingDays, T("أيام التمرين", "Training"), T("أسبوعياً", "days/wk")],
        ].map(([id, val, label, unit]) => (
          <div key={id} style={{ background: COLORS.surface, borderRadius: 14, padding: "12px 6px", textAlign: "center", border: `1px solid ${COLORS.line}` }}>
            {ed(id, String(val), { fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 19, color: COLORS.gold, textAlign: "center" }, "3.2em")}
            <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>{label}</div>
            <div style={{ fontSize: 9, color: COLORS.mutedDim }}>{unit}</div>
          </div>
        ))}
      </div>

      <SectionTitle eyebrow={T("أحدث أسبوع مسجّل", "Latest logged week")} title={latestWeek ? `${T("الأسبوع", "Week")} ${latestWeek}` : T("لا يوجد تسجيل بعد", "No entries yet")} />
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <div style={{ background: COLORS.surface, borderRadius: 16, padding: 16, flex: 1, border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", gap: 14 }}>
          <Ring pct={stepsPct} color={COLORS.gold}><span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 13 }}>{Math.round(stepsPct * 100)}%</span></Ring>
          <div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>{T("الخطوات الأسبوعية", "Weekly steps")}</div>
            <div style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 16, marginTop: 3 }}>
              {cur && cur.steps ? formatEnNumber(cur.steps) : "—"} <span style={{ fontSize: 11, color: COLORS.mutedDim, fontFamily: "'Tajawal', sans-serif" }}>/ {ed("profile.weeklySteps", String(p.weeklySteps), { fontSize: 11 })}</span>
            </div>
          </div>
        </div>
        <div style={{ background: COLORS.surface, borderRadius: 16, padding: 16, flex: 1, border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", gap: 14 }}>
          <Ring pct={calPct} color={COLORS.green}><span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 13 }}>{Math.round(calPct * 100)}%</span></Ring>
          <div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>{T("السعرات الأسبوعية", "Weekly calories")}</div>
            <div style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 16, marginTop: 3 }}>
              {cur && cur.calories ? formatEnNumber(cur.calories) : "—"} <span style={{ fontSize: 11, color: COLORS.mutedDim, fontFamily: "'Tajawal', sans-serif" }}>/ {ed("profile.weeklyCalories", String(p.weeklyCalories), { fontSize: 11 })}</span>
            </div>
          </div>
        </div>
      </div>

      <SectionTitle title={T("الأهداف اليومية للتغذية", "Daily nutrition targets")} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24 }}>
        {[
          ["profile.protein", p.protein, T("بروتين", "Protein"), COLORS.gold],
          ["profile.carbs", p.carbs, T("كارب", "Carbs"), COLORS.blue],
          ["profile.fat", p.fat, T("دهون", "Fat"), COLORS.rust],
          ["profile.fiber", p.fiber, T("ألياف", "Fiber"), COLORS.green],
        ].map(([id, val, label, color]) => (
          <div key={id} style={{ background: COLORS.surface, borderRadius: 14, padding: "12px 4px", textAlign: "center", border: `1px solid ${COLORS.line}`, borderTop: `3px solid ${color}` }}>
            {ed(id, val, { fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 13, textAlign: "center" }, "4.5em")}
            <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 3 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: COLORS.surface, borderRadius: 14, padding: 14, border: `1px solid ${COLORS.line}`, marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, marginBottom: 6 }}>{T("الكارديو الأسبوعي", "Weekly cardio")}</div>
        {editMode
          ? <textarea value={overrides["profile.cardio"] ?? p.cardio} onChange={e => setOverride("profile.cardio", e.target.value)}
              style={{ width: "100%", minHeight: 60, background: COLORS.surface2, border: `1px solid ${COLORS.gold}`, borderRadius: 8, color: COLORS.text, fontSize: 13, padding: 8, fontFamily: "inherit" }} />
          : <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.9 }}>{toEnNum(overrides["profile.cardio"] ?? p.cardio)}</div>}
      </div>

      <div style={{ fontSize: 11, color: COLORS.mutedDim, textAlign: "center", marginTop: 18, lineHeight: 1.8 }}>
        {T("السعرات والماكروز أهداف يومية · السعرات والخطوات أهداف أسبوعية", "Calories & macros are daily · calorie/step totals above are weekly")}<br/>
        {T("الأدوات", "Tools")}: {ed("profile.tools", p.tools, { fontSize: 11 })} · {T("الخبرة", "Experience")}: {ed("profile.experience", p.experience, { fontSize: 11 })}
      </div>
    </div>
  );
}

/* ---------------- WORKOUT ---------------- */
function WorkoutTab({ phase, setPhase, weekIdx, setWeekIdx, dayIdx, setDayIdx, workoutLogs, setExerciseLog, globalWeekNum, T, editMode, overrides, setOverride, exLang, setExLang, sessionStarts, sessionDurations, startSessionIfNeeded, recordSessionDuration, resetDay }) {
  const tx = (ar, en) => (exLang === "ar" ? ar : en);
  const days = phase === 1 ? PROGRAM.phase1 : PROGRAM.phase2;
  const day = days[dayIdx];
  const week = day.weeks[weekIdx];
  const isDeload = weekIdx === 5;
  const dayTitleId = `dayTitle.${phase}.${dayIdx}`;
  const defaultTitle = T(day.title.replace(/^اليوم [^:]+:\s*/, ""), (DAY_TR[day.title] || "").replace(/^Day \d+:\s*/, ""));
  const isDayDone = (di, wi) => {
    const dExercises = days[di].exercises;
    return dExercises.length > 0 && dExercises.every((_, i) => workoutLogs[`p${phase}-w${wi}-d${di}-e${i}`]?.done);
  };
  const isWeekDone = (wi) => days.every((d, di) => isDayDone(di, wi));
  const doneCount = day.exercises.filter((_, i) => workoutLogs[`p${phase}-w${weekIdx}-d${dayIdx}-e${i}`]?.done).length;
  const totalCount = day.exercises.length;
  const nextIdx = day.exercises.findIndex((_, i) => !workoutLogs[`p${phase}-w${weekIdx}-d${dayIdx}-e${i}`]?.done);
  const nextEx = nextIdx >= 0 ? day.exercises[nextIdx] : null;
  const nextName = nextEx ? tx(nextEx.name, EX_TR[nextEx.name] || nextEx.name) : null;
  const nextExerciseRef = useRef(null);

  useEffect(() => {
    if (nextExerciseRef.current) {
      nextExerciseRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [phase, weekIdx, dayIdx]);

  const dayKey = `p${phase}-w${weekIdx}-d${dayIdx}`;

  const [rest, setRest] = useState(null);
  const startRest = (seconds, label) => setRest({ endsAt: Date.now() + seconds * 1000, totalSeconds: seconds, label });

  const sessionStart = sessionStarts[dayKey];
  const sessionInProgress = !!sessionStart && doneCount < totalCount;

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!rest && !sessionInProgress) return;
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [!!rest, sessionInProgress]);

  const restRemaining = rest ? Math.max(0, Math.ceil((rest.endsAt - now) / 1000)) : 0;
  const vibratedRef = useRef(false);
  useEffect(() => {
    if (!rest) { vibratedRef.current = false; return; }
    if (restRemaining <= 0 && !vibratedRef.current) {
      vibratedRef.current = true;
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      const t = setTimeout(() => setRest(null), 2000);
      return () => clearTimeout(t);
    }
  }, [rest, restRemaining]);

  const sessionSeconds = doneCount === totalCount && totalCount > 0
    ? sessionDurations[dayKey]
    : sessionStart ? (now - sessionStart) / 1000 : null;

  const prevDayStateRef = useRef({ key: dayKey, doneCount });
  useEffect(() => {
    const prev = prevDayStateRef.current;
    const justCompleted = prev.key === dayKey && prev.doneCount < totalCount && doneCount === totalCount && totalCount > 0;
    prevDayStateRef.current = { key: dayKey, doneCount };
    if (!justCompleted) return;
    const start = sessionStarts[dayKey];
    if (start) recordSessionDuration(dayKey, Math.round((Date.now() - start) / 1000));
    const timer = setTimeout(() => {
      if (dayIdx < days.length - 1) {
        setDayIdx(dayIdx + 1);
      } else if (weekIdx < day.weeks.length - 1) {
        setWeekIdx(weekIdx + 1);
        setDayIdx(0);
      } else if (phase === 1) {
        setPhase(2);
        setWeekIdx(0);
        setDayIdx(0);
      }
    }, 900);
    return () => clearTimeout(timer);
  }, [dayKey, doneCount, totalCount, dayIdx, weekIdx, phase, days.length, day.weeks.length, setDayIdx, setWeekIdx, setPhase]);

  return (
    <div style={{ padding: "16px 16px 8px" }}>
      <SectionTitle
        eyebrow={`${T("المرحلة", "Phase")} ${phase === 1 ? T("الأولى", "1") : T("الثانية", "2")} · ${T("أسبوع", "Week")} ${globalWeekNum}`}
        title={<Ed id={dayTitleId} fallback={defaultTitle} editMode={editMode} overrides={overrides} setOverride={setOverride} style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 20 }} width="14em" />}
        right={
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
            <span style={{ fontSize: 9.5, color: COLORS.mutedDim }}>{T("لغة أسماء التمارين", "Exercise names")}</span>
            <div style={{ display: "flex", background: COLORS.surface, borderRadius: 8, border: `1px solid ${COLORS.line}`, overflow: "hidden" }}>
              {["ar", "en"].map(l => (
                <button key={l} onClick={() => setExLang(l)} style={{
                  padding: "3px 9px", border: "none", cursor: "pointer", fontWeight: 800, fontSize: 11,
                  background: exLang === l ? COLORS.gold : "transparent", color: exLang === l ? "#1a1508" : COLORS.mutedDim,
                }}>{l === "ar" ? "AR" : "EN"}</button>
              ))}
            </div>
          </div>
        }
      />

      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {[1, 2].map(ph => (
          <button key={ph} onClick={() => { setPhase(ph); setWeekIdx(0); }} style={{
            flex: 1, padding: "8px 0", borderRadius: 10, border: `1px solid ${phase === ph ? COLORS.gold : COLORS.line}`,
            background: phase === ph ? COLORS.gold : "transparent", color: phase === ph ? "#1a1508" : COLORS.muted,
            fontWeight: 800, fontSize: 12.5, cursor: "pointer",
          }}>{T("المرحلة", "Phase")} {ph === 1 ? T("الأولى", "1") : T("الثانية", "2")} ({T("أسابيع", "wks")} {ph === 1 ? "1-6" : "7-12"})</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 14 }}>
        {week && day.weeks.map((w, i) => {
          const wDone = isWeekDone(i);
          return (
            <button key={i} onClick={() => setWeekIdx(i)} style={{
              flexShrink: 0, padding: "7px 14px", borderRadius: 20, position: "relative",
              border: `1px solid ${weekIdx === i ? COLORS.gold : (wDone ? COLORS.green : COLORS.line)}`,
              background: weekIdx === i ? "rgba(201,162,39,0.15)" : (wDone ? "rgba(90,160,107,0.1)" : "transparent"),
              color: weekIdx === i ? COLORS.gold : (wDone ? COLORS.green : COLORS.mutedDim),
              fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
              textDecoration: wDone ? "line-through" : "none",
            }}>
              {wDone && <span style={{ position: "absolute", top: -6, insetInlineEnd: -2, fontSize: 11, textDecoration: "none" }}>✓</span>}
              {T("أسبوع", "Week")} {i + (phase === 1 ? 1 : 7)}{i === 5 ? ` (${T("ديلود", "deload")})` : ""}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {days.map((d, i) => {
          const dDone = isDayDone(i, weekIdx);
          return (
            <button key={i} onClick={() => setDayIdx(i)} style={{
              flex: 1, padding: "8px 2px", borderRadius: 10, position: "relative",
              border: `1px solid ${dayIdx === i ? COLORS.gold : (dDone ? COLORS.green : COLORS.line)}`,
              background: dayIdx === i ? "rgba(215,173,43,0.14)" : (dDone ? "rgba(90,160,107,0.1)" : "transparent"),
              color: dayIdx === i ? COLORS.gold : (dDone ? COLORS.green : COLORS.mutedDim),
              fontSize: 11, fontWeight: 700, cursor: "pointer",
            }}>
              {dDone && <span style={{ position: "absolute", top: -6, insetInlineEnd: -4, fontSize: 12 }}>✓</span>}
              {T("يوم", "Day")} {i + 1}
            </button>
          );
        })}
      </div>

      {(doneCount > 0 || day.exercises.some((_, i) => workoutLogs[`p${phase}-w${weekIdx}-d${dayIdx}-e${i}`]?.weight || workoutLogs[`p${phase}-w${weekIdx}-d${dayIdx}-e${i}`]?.reps?.some(r => r))) && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <button
            onClick={() => {
              if (window.confirm(T("متأكد تبي تصفّر بيانات هذا اليوم؟ (الأوزان والتكرارات والوقت)", "Reset this day's data? (weights, reps, and time)"))) {
                resetDay(phase, weekIdx, dayIdx);
              }
            }}
            style={{ background: "none", border: "none", color: COLORS.mutedDim, fontSize: 11, cursor: "pointer", fontWeight: 700, textDecoration: "underline" }}
          >↺ {T("إعادة تعيين اليوم", "Reset day")}</button>
        </div>
      )}

      {totalCount > 0 && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
          background: doneCount === totalCount ? "rgba(90,160,107,0.12)" : COLORS.surface,
          border: `1px solid ${doneCount === totalCount ? COLORS.green : COLORS.line}`,
          borderRadius: 12, padding: "10px 14px", marginBottom: 16,
        }}>
          {doneCount === totalCount ? (
            <>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.green }}>✓ {T("خلصت كل تمارين اليوم!", "All exercises for today are done!")}</span>
              {sessionSeconds != null && (
                <span style={{ fontSize: 11, color: COLORS.green, flexShrink: 0, fontWeight: 700 }}>⏱ {formatClock(sessionSeconds)}</span>
              )}
            </>
          ) : (
            <>
              <span style={{ fontSize: 12, color: COLORS.muted }}>
                {T("التالي", "Next up")}: <span style={{ color: COLORS.text, fontWeight: 700 }}>{nextName}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                {sessionSeconds != null && (
                  <span style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700 }}>⏱ {formatClock(sessionSeconds)}</span>
                )}
                <span style={{ fontSize: 11, color: COLORS.mutedDim }}>{doneCount}/{totalCount}</span>
              </span>
            </>
          )}
        </div>
      )}

      {isDeload && (
        <div style={{ background: "rgba(193,90,60,0.12)", border: `1px solid ${COLORS.rust}`, borderRadius: 12, padding: "10px 14px", marginBottom: 16, fontSize: 12.5, color: "#E6A28D", lineHeight: 1.8 }}>
          {T("أسبوع ديلود (راحة نشطة) — خفّف الأوزان 20-30% ولا توصل للفشل العضلي.", "Deload week (active recovery) — cut weights 20-30% and avoid muscular failure.")}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {day.exercises.map((ex, i) => {
          const spec = week.sets[i];
          const key = `p${phase}-w${weekIdx}-d${dayIdx}-e${i}`;
          const log = workoutLogs[key] || { weight: "", reps: [] };
          const nameId = `exName.${phase}.${dayIdx}.${i}`;
          const defaultName = tx(ex.name, EX_TR[ex.name] || ex.name);
          const setsId = `exSpec.${phase}.${weekIdx}.${dayIdx}.${i}.sets`;
          const repsId = `exSpec.${phase}.${weekIdx}.${dayIdx}.${i}.reps`;
          const restId = `exSpec.${phase}.${weekIdx}.${dayIdx}.${i}.rest`;
          const rirId = `exSpec.${phase}.${weekIdx}.${dayIdx}.${i}.rir`;
          const setsVal = overrides[setsId] ?? spec.sets;
          const repsVal = overrides[repsId] ?? (spec.reps || "");
          const restVal = overrides[restId] ?? (spec.rest || "");
          const rirVal = overrides[rirId] ?? (spec.rir || "");
          const numSets = parseInt(toEnNum(setsVal), 10) || 0;
          const defaultWeight = log.weight ? "" : getDefaultWeight(workoutLogs, phase, weekIdx, dayIdx, i);
          const weightVal = log.weight || defaultWeight;
          const isDefaultWeight = !log.weight && !!defaultWeight;

          return (
            <div key={key} ref={i === nextIdx ? nextExerciseRef : null} style={{ background: log.done ? "rgba(90,160,107,0.08)" : COLORS.surface, borderRadius: 16, padding: 14, border: `1px solid ${i === nextIdx ? COLORS.gold : (log.done ? COLORS.green : COLORS.line)}`, transition: "all 0.2s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button
                    onClick={() => { startSessionIfNeeded(dayKey); setExerciseLog(key, cur => ({ ...cur, done: !cur.done })); }}
                    style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
                      border: `1px solid ${log.done ? COLORS.green : COLORS.line}`,
                      background: log.done ? COLORS.green : COLORS.surface3,
                      color: log.done ? "#0d1a10" : COLORS.gold,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 12,
                    }}
                  >{log.done ? "✓" : toEnNum(ex.num)}</button>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <Ed id={nameId} fallback={defaultName} editMode={editMode} overrides={overrides} setOverride={setOverride} style={{ fontWeight: 700, fontSize: 15, textDecoration: log.done ? "line-through" : "none", opacity: log.done ? 0.7 : 1 }} width="12em" />
                      {log.done && !editMode && (
                        <span style={{ fontSize: 10, fontWeight: 800, color: COLORS.green, background: "rgba(90,160,107,0.15)", border: `1px solid ${COLORS.green}`, borderRadius: 6, padding: "1px 6px" }}>{T("تم الانتهاء", "Done")}</span>
                      )}
                    </div>
                    {editMode ? (
                      <div style={{ display: "flex", gap: 6, marginTop: 6, alignItems: "center", flexWrap: "wrap" }}>
                        <Ed id={setsId} fallback={String(spec.sets)} editMode width="2.5em" overrides={overrides} setOverride={setOverride} style={{ fontSize: 11 }} />
                        <span style={{ fontSize: 10, color: COLORS.mutedDim }}>{T("جولات ×", "sets ×")}</span>
                        <Ed id={repsId} fallback={spec.reps || ""} editMode width="4em" overrides={overrides} setOverride={setOverride} style={{ fontSize: 11 }} />
                        <span style={{ fontSize: 10, color: COLORS.mutedDim }}>{T("تكرار · راحة", "reps · rest")}</span>
                        <Ed id={restId} fallback={spec.rest || ""} editMode width="4.5em" overrides={overrides} setOverride={setOverride} style={{ fontSize: 11 }} />
                        <span style={{ fontSize: 10, color: COLORS.mutedDim }}>{T("· قرب الفشل", "· RIR")}</span>
                        <Ed id={rirId} fallback={spec.rir || ""} editMode width="2.5em" overrides={overrides} setOverride={setOverride} style={{ fontSize: 11 }} />
                      </div>
                    ) : (
                      <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 2 }}>
                        {setsVal} {T("جولات ×", "sets ×")} {repsVal || "—"} {T("تكرار · راحة", "reps · rest")} {restVal || "—"}
                        {rirVal && <> · {T("قرب الفشل", "RIR")} {rirVal}</>}
                      </div>
                    )}
                  </div>
                </div>
                {ex.video && (
                  <a href={ex.video} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: COLORS.gold, border: `1px solid ${COLORS.goldDim}`, borderRadius: 8, padding: "4px 8px", textDecoration: "none", flexShrink: 0, fontWeight: 700 }}>▶ {T("فيديو", "Video")}</a>
                )}
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: COLORS.muted, flexShrink: 0 }}>{T("الوزن", "Weight")}</label>
                <input type="text" inputMode="decimal" placeholder="kg" value={weightVal}
                  onChange={e => setExerciseLog(key, cur => ({ ...cur, weight: toEnNum(e.target.value) }))}
                  style={{ width: 70, background: COLORS.surface2, border: `1px solid ${isDefaultWeight ? COLORS.goldDim : COLORS.line}`, borderRadius: 8, padding: "6px 10px", color: isDefaultWeight ? COLORS.muted : COLORS.text, fontSize: 13, fontFamily: "inherit" }} />
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: 10.5, color: COLORS.mutedDim }}>{T("سجّل تكرارات كل جولة", "Log reps per set")}</span>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {Array.from({ length: numSets }).map((_, si) => (
                  <div key={si} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <input type="text" inputMode="numeric" placeholder="-" value={(log.reps && log.reps[si]) || ""}
                      onChange={e => {
                        const newVal = toEnNum(e.target.value);
                        const wasEmpty = !(log.reps && log.reps[si]);
                        const newReps = Array.from({ length: numSets }).map((_, k) => (k === si ? newVal : (log.reps && log.reps[k]) || ""));
                        const justCompleted = numSets > 0 && newReps.every(r => r);
                        setExerciseLog(key, cur => ({ ...cur, reps: newReps, done: justCompleted ? true : cur.done }));
                        if (wasEmpty && newVal) {
                          startRest(parseRestSeconds(restVal), defaultName);
                          startSessionIfNeeded(dayKey);
                        }
                      }}
                      style={{ width: 40, height: 40, borderRadius: "50%", textAlign: "center", border: `2px solid ${(log.reps && log.reps[si]) ? COLORS.gold : COLORS.line}`, background: (log.reps && log.reps[si]) ? "rgba(201,162,39,0.14)" : COLORS.surface2, color: COLORS.text, fontWeight: 800, fontSize: 14, fontFamily: "'Cairo', sans-serif" }} />
                    <span style={{ fontSize: 9, color: COLORS.mutedDim }}>{T("جولة", "Set")} {si + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {rest && (
        <div style={{
          position: "fixed", bottom: "calc(70px + env(safe-area-inset-bottom))", left: "50%", transform: "translateX(-50%)",
          width: "min(92%, 480px)", background: "rgba(24,25,27,0.97)", backdropFilter: "blur(10px)",
          border: `1px solid ${restRemaining <= 0 ? COLORS.green : COLORS.gold}`, borderRadius: 16, padding: "10px 14px", zIndex: 45,
          boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: COLORS.muted }}>
              {restRemaining <= 0 ? T("خلصت الراحة! ✅", "Rest done! ✅") : T("راحة", "Resting")} · <span style={{ color: COLORS.text, fontWeight: 700 }}>{rest.label}</span>
            </span>
            <button onClick={() => setRest(null)} style={{ background: "none", border: "none", color: COLORS.mutedDim, fontSize: 11, cursor: "pointer", fontWeight: 700 }}>{T("تخطي ✕", "Skip ✕")}</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 20, color: restRemaining <= 0 ? COLORS.green : COLORS.gold, minWidth: "3em" }}>{formatClock(restRemaining)}</span>
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: COLORS.surface3, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 3, background: restRemaining <= 0 ? COLORS.green : COLORS.gold,
                width: `${Math.max(0, Math.min(100, (restRemaining / rest.totalSeconds) * 100))}%`,
                transition: "width 1s linear",
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- FOLLOWUP ---------------- */
function FollowupTab({ followup, setFollowup, T }) {
  const [openWeek, setOpenWeek] = useState(() => {
    for (let i = 1; i <= TOTAL_WEEKS; i++) if (!followup[i] || !followup[i].steps) return i;
    return 1;
  });

  const chartData = useMemo(() => Array.from({ length: TOTAL_WEEKS }).map((_, i) => {
    const w = followup[i + 1] || {};
    return {
      week: `${T("أ", "W")}${i + 1}`,
      weight: w.weight ? Number(w.weight) : null,
      steps: w.steps ? Number(w.steps) : null,
    };
  }), [followup, T]);

  const update = (week, field, value) => setFollowup(prev => ({ ...prev, [week]: { ...prev[week], [field]: value } }));

  return (
    <div style={{ padding: "16px 16px 8px" }}>
      <SectionTitle eyebrow={T("سجل أسبوعي", "Weekly log")} title={T("المتابعة", "Progress")} />

      <div style={{ background: COLORS.surface, borderRadius: 16, padding: "14px 8px 4px", border: `1px solid ${COLORS.line}`, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: COLORS.muted, padding: "0 8px 10px", fontWeight: 700 }}>{T("تطور الوزن (كغ)", "Weight progress (kg)")}</div>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={chartData} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={COLORS.line} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: COLORS.mutedDim, fontSize: 10 }} axisLine={{ stroke: COLORS.line }} tickLine={false} />
            <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fill: COLORS.mutedDim, fontSize: 10 }} tickFormatter={formatEnNumber} axisLine={false} tickLine={false} width={30} />
            <Tooltip formatter={formatEnNumber} contentStyle={{ background: COLORS.surface3, border: `1px solid ${COLORS.line}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: COLORS.text }} />
            <Line type="monotone" dataKey="weight" name={T("الوزن", "Weight")} stroke={COLORS.gold} strokeWidth={2.5} dot={{ r: 3, fill: COLORS.gold }} connectNulls />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: COLORS.surface, borderRadius: 16, padding: "14px 8px 4px", border: `1px solid ${COLORS.line}`, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: COLORS.muted, padding: "0 8px 10px", fontWeight: 700 }}>{T(`الخطوات الأسبوعية مقابل الهدف (${formatEnNumber(META.profile.weeklySteps)})`, `Weekly steps vs. goal (${formatEnNumber(META.profile.weeklySteps)})`)}</div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={chartData} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={COLORS.line} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: COLORS.mutedDim, fontSize: 10 }} axisLine={{ stroke: COLORS.line }} tickLine={false} />
            <YAxis tick={{ fill: COLORS.mutedDim, fontSize: 10 }} tickFormatter={formatEnNumber} axisLine={false} tickLine={false} width={30} />
            <Tooltip formatter={formatEnNumber} contentStyle={{ background: COLORS.surface3, border: `1px solid ${COLORS.line}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: COLORS.text }} />
            <Bar dataKey="steps" name={T("الخطوات", "Steps")} fill={COLORS.blue} radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <SectionTitle title={T("تسجيل أسبوعي", "Weekly entries")} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Array.from({ length: TOTAL_WEEKS }).map((_, i) => {
          const wk = i + 1;
          const data = followup[wk] || {};
          const open = openWeek === wk;
          const filled = data.weight || data.calories || data.protein || data.steps;
          return (
            <div key={wk} style={{ background: COLORS.surface, borderRadius: 14, border: `1px solid ${COLORS.line}`, overflow: "hidden" }}>
              <button onClick={() => setOpenWeek(open ? null : wk)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", padding: "12px 16px", cursor: "pointer", color: COLORS.text }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{T("الأسبوع", "Week")} {wk}{wk === 6 || wk === 12 ? ` (${T("ديلود", "deload")})` : ""}</span>
                <span style={{ fontSize: 12, color: filled ? COLORS.green : COLORS.mutedDim }}>{filled ? `✓ ${T("مسجّل", "Logged")}` : T("لم يسجّل", "Empty")}</span>
              </button>
              {open && (
                <div style={{ padding: "0 16px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    ["weight", T("الوزن (كغ)", "Weight (kg)")],
                    ["steps", T("الخطوات", "Steps")],
                    ["calories", T("السعرات", "Calories")],
                    ["protein", T("البروتين (غ)", "Protein (g)")],
                  ].map(([field, label]) => (
                    <div key={field}>
                      <label style={{ fontSize: 11, color: COLORS.muted, display: "block", marginBottom: 4 }}>{label}</label>
                      <input type="text" inputMode="decimal" value={toEnNum(data[field] || "")} onChange={e => update(wk, field, toEnNum(e.target.value))}
                        style={{ width: "100%", background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "8px 10px", color: COLORS.text, fontSize: 13, fontFamily: "inherit" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- MENU ---------------- */
function AddFoodForm({ T, onAdd }) {
  const [form, setForm] = useState({ name: "", cal: "", protein: "", netCarb: "", fat: "", fiber: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState("idle"); // idle | loading | error | done

  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) { setSearchResults([]); setSearchState("idle"); return; }
    setSearchState("loading");
    const t = setTimeout(async () => {
      const controller = new AbortController();
      const abortTimer = setTimeout(() => controller.abort(), 6000);
      try {
        const url = `/api/food-search?q=${encodeURIComponent(q)}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        const products = (data.products || []).filter(p => p.product_name && p.nutriments && p.nutriments["energy-kcal_100g"] != null);
        setSearchResults(products);
        setSearchState("done");
      } catch (e) {
        setSearchResults([]);
        setSearchState("error");
      } finally {
        clearTimeout(abortTimer);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const pickSearchResult = (product) => {
    const n = product.nutriments;
    const carbs = Number(n.carbohydrates_100g) || 0;
    const fiber = Number(n.fiber_100g) || 0;
    setForm({
      name: product.brands ? `${product.product_name} (${product.brands})` : product.product_name,
      cal: String(Math.round(Number(n["energy-kcal_100g"]) || 0)),
      protein: String(Math.round((Number(n.proteins_100g) || 0) * 10) / 10),
      netCarb: String(Math.round(Math.max(0, carbs - fiber) * 10) / 10),
      fat: String(Math.round((Number(n.fat_100g) || 0) * 10) / 10),
      fiber: String(Math.round(fiber * 10) / 10),
    });
    setSearchQuery("");
    setSearchResults([]);
    setSearchState("idle");
  };

  const submitForm = () => {
    if (!form.name.trim() || !form.cal) return;
    onAdd({
      name: form.name.trim(),
      cal: Number(toEnNum(form.cal)) || 0,
      protein: Number(toEnNum(form.protein)) || 0,
      netCarb: Number(toEnNum(form.netCarb)) || 0,
      fat: Number(toEnNum(form.fat)) || 0,
      fiber: Number(toEnNum(form.fiber)) || 0,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, background: COLORS.surface3, borderRadius: 12, padding: 10, marginTop: 8 }}>
      <div>
        <input placeholder={T("🔍 ابحث عن أكلة (يعبي القيم تلقائياً)", "🔍 Search for a food (auto-fills values)")} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          style={{ width: "100%", background: COLORS.surface2, border: `1px solid ${COLORS.goldDim}`, borderRadius: 8, padding: "8px 10px", color: COLORS.text, fontSize: 13, fontFamily: "inherit" }} />
        {searchState === "loading" && <div style={{ fontSize: 11, color: COLORS.mutedDim, marginTop: 6 }}>{T("جاري البحث...", "Searching...")}</div>}
        {searchState === "error" && <div style={{ fontSize: 11, color: COLORS.rust, marginTop: 6 }}>{T("البحث غير متاح حالياً، جرّب لاحقاً أو أدخل القيم يدوياً", "Search unavailable right now — try again later or enter values manually")}</div>}
        {searchState === "done" && searchResults.length === 0 && <div style={{ fontSize: 11, color: COLORS.mutedDim, marginTop: 6 }}>{T("ما فيه نتائج", "No results")}</div>}
        {searchResults.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6, maxHeight: 200, overflowY: "auto" }}>
            {searchResults.map((p, i) => (
              <button key={i} onClick={() => pickSearchResult(p)} style={{
                textAlign: "start", background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "8px 10px", cursor: "pointer",
              }}>
                <div style={{ fontSize: 12.5, color: COLORS.text, fontWeight: 700 }}>{p.product_name}{p.brands ? ` (${p.brands})` : ""}</div>
                <div style={{ fontSize: 10.5, color: COLORS.mutedDim, marginTop: 2 }}>{Math.round(p.nutriments["energy-kcal_100g"])} {T("سعرة / 100غم", "kcal / 100g")}</div>
              </button>
            ))}
          </div>
        )}
      </div>
      <input placeholder={T("اسم الصنف", "Item name")} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        style={{ background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "8px 10px", color: COLORS.text, fontSize: 13, fontFamily: "inherit" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
        {[["cal", T("سعرة", "kcal")], ["protein", T("بروتين", "protein")], ["netCarb", T("كارب", "carb")], ["fat", T("دهون", "fat")], ["fiber", T("ألياف", "fiber")]].map(([fk, lbl]) => (
          <div key={fk}>
            <input type="text" inputMode="decimal" placeholder="0" value={form[fk]} onChange={e => setForm(f => ({ ...f, [fk]: e.target.value }))}
              style={{ width: "100%", background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "6px 4px", color: COLORS.text, fontSize: 12, textAlign: "center", fontFamily: "inherit" }} />
            <div style={{ fontSize: 8.5, color: COLORS.mutedDim, textAlign: "center", marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>
      <button onClick={submitForm} style={{ background: COLORS.gold, color: "#1a1508", border: "none", borderRadius: 8, padding: "8px 0", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>{T("إضافة", "Add")}</button>
    </div>
  );
}

function MacroBar({ label, value, target, color }) {
  const pct = target ? Math.max(0, Math.min(100, (value / target) * 100)) : 0;
  return (
    <div>
      <div style={{ fontSize: 12, color: COLORS.text, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 11, color: COLORS.mutedDim, marginBottom: 5 }}>
        <span style={{ color: COLORS.text, fontWeight: 700 }}>{Math.round(value)}</span>{target != null ? ` / ${Math.round(target)}` : ""}
      </div>
      <div style={{ height: 5, borderRadius: 3, background: COLORS.surface3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

function DailyCaloriesCard({ T, foodLog, addFoodItem, removeFoodItem, overrides }) {
  const p = META.profile;
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const selectedKey = dateKeyOf(selectedDate);
  const todaysKey = todayKey();
  const entries = foodLog[selectedKey] || [];
  const [openMealType, setOpenMealType] = useState(null);
  const weekDates = useMemo(() => currentWeekDates(), []);
  const dayLetters = [T("ح", "S"), T("ن", "M"), T("ث", "T"), T("ر", "W"), T("خ", "T"), T("ج", "F"), T("س", "S")];

  const totals = entries.reduce((acc, e) => ({
    cal: acc.cal + (Number(e.cal) || 0),
    protein: acc.protein + (Number(e.protein) || 0),
    netCarb: acc.netCarb + (Number(e.netCarb) || 0),
    fat: acc.fat + (Number(e.fat) || 0),
    fiber: acc.fiber + (Number(e.fiber) || 0),
  }), { cal: 0, protein: 0, netCarb: 0, fat: 0, fiber: 0 });

  const targets = {
    cal: parseTargetRange(overrides["profile.dailyCalories"] ?? p.dailyCalories),
    protein: parseTargetRange(overrides["profile.protein"] ?? p.protein),
    netCarb: parseTargetRange(overrides["profile.carbs"] ?? p.carbs),
    fat: parseTargetRange(overrides["profile.fat"] ?? p.fat),
    fiber: parseTargetRange(overrides["profile.fiber"] ?? p.fiber),
  };

  const calTarget = targets.cal || 0;
  const calRemaining = Math.round(calTarget - totals.cal);
  const calPct = calTarget ? Math.max(0, Math.min(100, (totals.cal / calTarget) * 100)) : 0;

  return (
    <div style={{ background: COLORS.surface, borderRadius: 16, padding: 16, border: `1px solid ${COLORS.line}`, marginBottom: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 16 }}>
        {weekDates.map((d, i) => {
          const dKey = dateKeyOf(d);
          const isSelected = dKey === selectedKey;
          const isToday = dKey === todaysKey;
          return (
            <button key={i} onClick={() => setSelectedDate(d)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "2px 0" }}>
              <span style={{ fontSize: 10, color: COLORS.mutedDim, fontWeight: 700 }}>{dayLetters[i]}</span>
              <span style={{
                width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800, fontFamily: "'Cairo', sans-serif",
                background: isSelected ? COLORS.gold : "transparent",
                color: isSelected ? "#1a1508" : (isToday ? COLORS.gold : COLORS.muted),
                border: !isSelected && isToday ? `1.5px dashed ${COLORS.gold}` : "none",
              }}>{d.getDate()}</span>
            </button>
          );
        })}
      </div>

      <div style={{ background: COLORS.surface2, borderRadius: 14, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 6 }}>{T("السعرات", "Calories")}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div>
            <span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 22, color: COLORS.text }}>{Math.round(totals.cal)}</span>
            <span style={{ fontSize: 12, color: COLORS.mutedDim }}> / {Math.round(calTarget)} 🔥</span>
          </div>
          <div style={{ textAlign: "end" }}>
            <span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 16, color: calRemaining >= 0 ? COLORS.gold : COLORS.rust }}>{Math.abs(calRemaining)}</span>
            <span style={{ fontSize: 11, color: COLORS.mutedDim }}> {calRemaining >= 0 ? T("متبقي", "left") : T("زيادة", "over")}</span>
          </div>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: COLORS.surface3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${calPct}%`, background: COLORS.gold, borderRadius: 4, transition: "width 0.3s ease" }} />
        </div>
      </div>

      <div style={{ background: COLORS.surface2, borderRadius: 14, padding: 14, marginBottom: 18, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        <MacroBar label={T("كارب", "Carbs")} value={totals.netCarb} target={targets.netCarb} color={COLORS.blue} />
        <MacroBar label={T("دهون", "Fat")} value={totals.fat} target={targets.fat} color={COLORS.rust} />
        <MacroBar label={T("بروتين", "Protein")} value={totals.protein} target={targets.protein} color={COLORS.gold} />
        <MacroBar label={T("ألياف", "Fiber")} value={totals.fiber} target={targets.fiber} color={COLORS.green} />
      </div>

      <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.text, marginBottom: 10 }}>{T("وجباتك", "Meals")}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MEAL_TYPES.map(mt => {
          const items = entries.filter(e => (e.mealType || "snacks") === mt.key);
          const mealCal = items.reduce((s, e) => s + (Number(e.cal) || 0), 0);
          const isOpen = openMealType === mt.key;
          return (
            <div key={mt.key} style={{ background: COLORS.surface2, borderRadius: 12, padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: COLORS.gold }}><MealIcon name={mt.key} /></span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{T(mt.ar, mt.en)}</div>
                    {items.length > 0 && <div style={{ fontSize: 10.5, color: COLORS.mutedDim }}>{Math.round(mealCal)} {T("سعرة", "kcal")}</div>}
                  </div>
                </div>
                <button onClick={() => setOpenMealType(isOpen ? null : mt.key)} style={{
                  background: isOpen ? COLORS.surface3 : "none", border: `1px solid ${COLORS.goldDim}`, color: COLORS.gold, borderRadius: 20, padding: "5px 14px", fontSize: 11.5, fontWeight: 700, cursor: "pointer",
                }}>{isOpen ? T("إغلاق", "Close") : T("تسجيل", "Log")}</button>
              </div>

              {items.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 10 }}>
                  {items.map(e => (
                    <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, padding: "6px 8px", background: COLORS.surface3, borderRadius: 8 }}>
                      <span style={{ color: COLORS.text }}>{e.name}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: COLORS.gold, fontWeight: 700 }}>{Math.round(e.cal)}</span>
                        <button onClick={() => removeFoodItem(e.id, selectedKey)} style={{ background: "none", border: "none", color: COLORS.mutedDim, cursor: "pointer", fontSize: 13 }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isOpen && (
                <AddFoodForm T={T} onAdd={(item) => { addFoodItem({ ...item, mealType: mt.key }, selectedKey); setOpenMealType(null); }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MenuTab({ mealCat, setMealCat, T, editMode, overrides, setOverride, foodLog, addFoodItem, removeFoodItem }) {
  const cat = META.meals[mealCat] || META.meals[0];
  const catNameId = `mealCat.${mealCat}`;
  const catDefault = T(cat.category, MEAL_CAT_TR[cat.category] || cat.category);
  const [search, setSearch] = useState("");
  const [quickMealType, setQuickMealType] = useState(cat.category === "سناكات" ? "snacks" : "lunch");
  const [suggestedNames, setSuggestedNames] = useState(null);
  const q = search.trim().toLowerCase();
  const visibleItems = q
    ? cat.items
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => item.name.toLowerCase().includes(q))
    : cat.items.map((item, i) => ({ item, i }));

  const suggestMeals = () => {
    const p = META.profile;
    const entries = foodLog[todayKey()] || [];
    const totals = entries.reduce((acc, e) => ({
      cal: acc.cal + (Number(e.cal) || 0),
      protein: acc.protein + (Number(e.protein) || 0),
      netCarb: acc.netCarb + (Number(e.netCarb) || 0),
      fat: acc.fat + (Number(e.fat) || 0),
      fiber: acc.fiber + (Number(e.fiber) || 0),
    }), { cal: 0, protein: 0, netCarb: 0, fat: 0, fiber: 0 });
    const remaining = {
      cal: (parseTargetRange(overrides["profile.dailyCalories"] ?? p.dailyCalories) || 0) - totals.cal,
      protein: (parseTargetRange(overrides["profile.protein"] ?? p.protein) || 0) - totals.protein,
      netCarb: (parseTargetRange(overrides["profile.carbs"] ?? p.carbs) || 0) - totals.netCarb,
      fat: (parseTargetRange(overrides["profile.fat"] ?? p.fat) || 0) - totals.fat,
      fiber: (parseTargetRange(overrides["profile.fiber"] ?? p.fiber) || 0) - totals.fiber,
    };

    if (remaining.cal <= 0) { setSuggestedNames(new Set()); return; }

    const scored = META.meals.flatMap(c => c.items)
      .filter(item => item.cal <= remaining.cal)
      .map(item => {
        let score = Math.min(item.netCarb, Math.max(remaining.netCarb, 0))
          + Math.min(item.fiber, Math.max(remaining.fiber, 0)) * 3;
        if (remaining.protein <= 0) score -= item.protein * 1.5;
        if (remaining.fat <= 0) score -= item.fat * 1.5;
        return { item, score };
      })
      .sort((a, b) => b.score - a.score);

    const picked = [];
    let calBudget = remaining.cal;
    for (const { item } of scored) {
      if (picked.length >= 3) break;
      if (item.cal <= calBudget) { picked.push(item); calBudget -= item.cal; }
    }
    picked.forEach(item => addFoodItem({ ...item, mealType: "snacks" }));
    setSuggestedNames(new Set(picked.map(i => i.name)));
  };

  return (
    <div style={{ padding: "16px 16px 8px" }}>
      <SectionTitle eyebrow={T("خيارات الوجبات", "Meal options")} title={T("منيو الأكل", "Food Menu")} />

      <DailyCaloriesCard T={T} foodLog={foodLog} addFoodItem={addFoodItem} removeFoodItem={removeFoodItem} overrides={overrides} />

      <button onClick={suggestMeals} style={{
        width: "100%", padding: "12px", marginBottom: 16, borderRadius: 12,
        border: `1px solid ${COLORS.goldDim}`, background: "rgba(201,162,39,0.1)",
        color: COLORS.gold, fontSize: 13, fontWeight: 800, cursor: "pointer",
      }}>🎯 {T("رتّب وأضف لي وجبات تكمّل هدفي اليوم", "Auto-fill meals to hit today's goal")}</button>

      {suggestedNames && suggestedNames.size === 0 && (
        <div style={{ fontSize: 12, color: COLORS.mutedDim, textAlign: "center", marginBottom: 16 }}>
          {T("ما فيه مجال سعرات كافي اليوم لإضافة وجبة", "No calorie room left today to add anything")}
        </div>
      )}

      {suggestedNames && suggestedNames.size > 0 && (
        <div style={{ background: "rgba(224,72,62,0.08)", border: `1px solid ${COLORS.red}`, borderRadius: 12, padding: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: COLORS.red, marginBottom: 8 }}>{T("تمت إضافتها لك تلقائياً (باللون الأحمر بالقائمة)", "Added automatically for you (highlighted in red below)")}</div>
          {META.meals.flatMap(c => c.items.map(item => ({ item, catLabel: T(c.category, MEAL_CAT_TR[c.category] || c.category) })))
            .filter(({ item }) => suggestedNames.has(item.name))
            .map(({ item, catLabel }) => (
              <div key={item.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", color: COLORS.text }}>
                <span>{item.name} <span style={{ color: COLORS.mutedDim, fontSize: 10.5 }}>· {catLabel}</span></span>
                <span style={{ color: COLORS.gold, fontWeight: 700 }}>{Math.round(item.cal)} {T("سعرة", "kcal")}</span>
              </div>
            ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 16 }}>
        {META.meals.map((m, ci) => {
          const id = `mealCat.${ci}`;
          const label = overrides[id] ?? T(m.category, MEAL_CAT_TR[m.category] || m.category);
          return (
            <button key={ci} onClick={() => { setMealCat(ci); setSearch(""); }} style={{
              flexShrink: 0, padding: "8px 14px", borderRadius: 20,
              border: `1px solid ${mealCat === ci ? COLORS.gold : COLORS.line}`,
              background: mealCat === ci ? "rgba(201,162,39,0.15)" : "transparent",
              color: mealCat === ci ? COLORS.gold : COLORS.mutedDim,
              fontSize: 12.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
            }}>{label}</button>
          );
        })}
      </div>

      {editMode && (
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, color: COLORS.muted }}>{T("اسم الفئة", "Category name")}</label>
          <Ed id={catNameId} fallback={catDefault} editMode overrides={overrides} setOverride={setOverride} style={{ display: "block", fontSize: 13, marginTop: 4 }} width="12em" />
        </div>
      )}

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={T("بحث عن وجبة...", "Search meals...")}
        style={{
          width: "100%", boxSizing: "border-box", padding: "10px 14px", marginBottom: 10,
          borderRadius: 12, border: `1px solid ${COLORS.line}`, background: COLORS.surface,
          color: COLORS.text, fontSize: 13.5, fontFamily: "'Cairo', sans-serif",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: COLORS.mutedDim }}>{T("أضف إلى:", "Add to:")}</span>
        {MEAL_TYPES.map(mt => (
          <button key={mt.key} onClick={() => setQuickMealType(mt.key)} style={{
            padding: "5px 12px", borderRadius: 20,
            border: `1px solid ${quickMealType === mt.key ? COLORS.gold : COLORS.line}`,
            background: quickMealType === mt.key ? "rgba(201,162,39,0.15)" : "transparent",
            color: quickMealType === mt.key ? COLORS.gold : COLORS.mutedDim,
            fontSize: 11.5, fontWeight: 700, cursor: "pointer",
          }}>{T(mt.ar, mt.en)}</button>
        ))}
      </div>

      {q && visibleItems.length === 0 && (
        <div style={{ fontSize: 12.5, color: COLORS.mutedDim, textAlign: "center", padding: "16px 0" }}>
          {T("ما فيه نتائج مطابقة", "No matching results")}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {visibleItems.map(({ item, i }) => {
          const base = `meal.${mealCat}.${i}`;
          const nameVal = overrides[`${base}.name`] ?? item.name;
          const fields = [
            ["cal", item.cal, T("سعرة", "kcal"), COLORS.gold, COLORS.surface3, 1.3],
            ["protein", item.protein, T("بروتين", "protein"), null, COLORS.surface2, 1],
            ["netCarb", item.netCarb, T("كارب صافي", "net carb"), null, COLORS.surface2, 1],
            ["fat", item.fat, T("دهون", "fat"), null, COLORS.surface2, 1],
            ["fiber", item.fiber, T("ألياف", "fiber"), null, COLORS.surface2, 1],
          ];
          const isSuggested = suggestedNames && suggestedNames.has(item.name);
          return (
            <div key={i} style={{ background: COLORS.surface, borderRadius: 16, padding: 16, border: `1px solid ${isSuggested ? COLORS.red : COLORS.line}`, boxShadow: isSuggested ? `0 0 0 1px ${COLORS.red}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 8 }}>
                <Ed id={`${base}.name`} fallback={nameVal} editMode={editMode} overrides={overrides} setOverride={setOverride} style={{ fontWeight: 700, fontSize: 14.5, flex: 1 }} width="16em" />
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {item.video && (
                    <a href={item.video} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: COLORS.gold, border: `1px solid ${COLORS.goldDim}`, borderRadius: 8, padding: "4px 8px", textDecoration: "none", fontWeight: 700 }}>▶ {T("الطبخ", "Recipe")}</a>
                  )}
                  <button
                    onClick={() => addFoodItem({
                      name: nameVal,
                      cal: Number(overrides[`${base}.cal`] ?? item.cal) || 0,
                      protein: Number(overrides[`${base}.protein`] ?? item.protein) || 0,
                      netCarb: Number(overrides[`${base}.netCarb`] ?? item.netCarb) || 0,
                      fat: Number(overrides[`${base}.fat`] ?? item.fat) || 0,
                      fiber: Number(overrides[`${base}.fiber`] ?? item.fiber) || 0,
                      mealType: quickMealType,
                    })}
                    style={{ fontSize: 11, color: "#1a1508", background: COLORS.gold, border: "none", borderRadius: 8, padding: "4px 10px", fontWeight: 800, cursor: "pointer" }}
                  >+ {T("أضف", "Add")}</button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {fields.map(([fkey, val, label, color, bg, flex]) => (
                  <div key={fkey} style={{ background: bg, borderRadius: 10, padding: "8px 4px", flex, textAlign: "center" }}>
                    <Ed id={`${base}.${fkey}`} fallback={String(val)} editMode={editMode} overrides={overrides} setOverride={setOverride}
                      style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: fkey === "cal" ? 16 : 14, color: color || COLORS.text, textAlign: "center" }} width="3em" />
                    <div style={{ fontSize: 9.5, color: COLORS.muted, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 11, color: COLORS.mutedDim, textAlign: "center", marginTop: 18, lineHeight: 1.8 }}>
        {T("صافي الكارب = إجمالي الكارب ناقص الألياف · الأولوية دائماً للسعرات ثم البروتين", "Net carb = total carbs minus fiber · always prioritize calories, then protein")}
      </div>
    </div>
  );
}
