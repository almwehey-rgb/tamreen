
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const PROGRAM = {"phase1": [{"day": 1, "title": "اليوم الأول: سحب ( ظهر + باي + أكتاف خلفي )", "exercises": [{"num": "١", "name": "عقلة", "video": "https://youtu.be/hLw8DPP7b-4"}, {"num": "٢", "name": "تي-بار ضيق", "video": "https://youtu.be/LPVLiYWjyKg"}, {"num": "٣", "name": "سحب مسطرة", "video": "https://youtu.be/jXRoh-W4Kqw"}, {"num": "٤", "name": "حبل أكتاف خلفي", "video": "https://youtu.be/byptEL33K8Y"}, {"num": "٥", "name": "جهاز أكتاف خلفي", "video": "https://youtu.be/evfADz6GUCc"}, {"num": "٦", "name": "بنش مرتفع بايسبس", "video": "https://youtu.be/aTYlqC_JacQ"}, {"num": "٧", "name": "جهاز باي ضيق", "video": "https://youtu.be/u6fc-b5wYF4"}], "weeks": [{"label": "الاسبوع الأول", "sets": [{"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثالث", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الرابع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الخامس", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع السادس", "sets": [{"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}]}]}, {"day": 2, "title": "اليوم الثاني:دفع ( صدر + تراي + أكتاف )", "exercises": [{"num": "١", "name": "بار عالي", "video": "https://youtu.be/qTzQVlVfhsQ"}, {"num": "٢", "name": "دامبل دفع", "video": "https://youtu.be/kNnC9wWAGOQ"}, {"num": "٣", "name": "جهاز تجميع", "video": "https://youtu.be/KJvDBXrOjH0"}, {"num": "٤", "name": "دامبل تراي", "video": "https://youtu.be/GLXgiMtlfOE"}, {"num": "٥", "name": "كيبل مسطرة", "video": "https://youtu.be/_zgFWq1wvO4"}, {"num": "٦", "name": "جهاز أكتاف", "video": "https://youtu.be/fvorj7QCaac"}, {"num": "٧", "name": "دامبل أكتاف جانبي جالس", "video": "https://youtu.be/UBx6cwLrsEE"}], "weeks": [{"label": "الاسبوع الأول", "sets": [{"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثالث", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الرابع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الخامس", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع السادس", "sets": [{"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}]}]}, {"day": 3, "title": "اليوم الثالث: جزء سفلي ( رجلين + معده  )", "exercises": [{"num": "١", "name": "جهاز دفع", "video": "https://youtu.be/15HOP8ohU60"}, {"num": "٢", "name": "لنجز", "video": "https://youtu.be/wrwwXE_x-pQ"}, {"num": "٣", "name": "دامبل ددلفت روم", "video": "https://youtu.be/dgdxrmXJE6I"}, {"num": "٤", "name": "رفرفة خلفي منسدح", "video": "https://youtu.be/OE_IE5eiYGc"}, {"num": "٥", "name": "بطات جالس", "video": "https://youtu.be/n25SsbAyMV4"}, {"num": "٦", "name": "جهاز معده", "video": "https://youtu.be/_O1xunCfYEM"}, {"num": "٧", "name": "بلانك", "video": "https://youtu.be/Q20K8nwbxN0"}], "weeks": [{"label": "الاسبوع الأول", "sets": [{"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "Failure", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "Failure", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثالث", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "Failure", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الرابع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "Failure", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الخامس", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "Failure", "rest": "1:00-2:00"}]}, {"label": "الاسبوع السادس", "sets": [{"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "Failure", "rest": "0:30-1:00"}]}]}, {"day": 4, "title": "اليوم الرابع: جزء علوي", "exercises": [{"num": "١", "name": "جهاز مستوي جالس", "video": "https://youtu.be/NwzUje3z0qY"}, {"num": "٢", "name": "دامبل تجميع", "video": "https://youtu.be/sHCg4QIw1uQ"}, {"num": "٣", "name": "كيبل سحب واسع", "video": "https://youtu.be/amgXq2ThD0c"}, {"num": "٤", "name": "كيبل بايسبس", "video": "https://youtu.be/fV9BpknCjGM"}, {"num": "٥", "name": "جهاز تجديف واسع", "video": "https://youtu.be/_FrrYQxA6kc"}, {"num": "٦", "name": "جهاز أكتاف جانبي", "video": "https://youtu.be/92drnZ4maWI"}, {"num": "٧", "name": "دبس للتراي", "video": "https://youtu.be/QB798EnRq_4"}], "weeks": [{"label": "الاسبوع الأول", "sets": [{"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني", "sets": [{"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثالث", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الرابع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الخامس", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع السادس", "sets": [{"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}]}]}, {"day": 5, "title": "اليوم الخامس: جزء سفلي ( رجلين + معده ومثلثات )", "exercises": [{"num": "١", "name": "جهاز هاك سكوات", "video": "https://youtu.be/EV5kZrHnVbM"}, {"num": "٢", "name": "رفرفة امامي", "video": "https://youtu.be/d4LEzUALIOw"}, {"num": "٣", "name": "ددلفت ستف", "video": "https://youtu.be/CN_7cz3P-1U"}, {"num": "٤", "name": "رفرفة خلفي جالس", "video": "https://youtu.be/9rLXQd6KBJ8"}, {"num": "٥", "name": "بطات واقف", "video": "https://youtu.be/SG1-FJqIjRU"}, {"num": "٦", "name": "بنش منخفض معده", "video": "https://youtu.be/hKii-SQ-hjc"}, {"num": "٧", "name": "دامبل مثلثات", "video": "https://youtu.be/_t3lrPI6Ns4"}], "weeks": [{"label": "الاسبوع الأول", "sets": [{"sets": "3", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني", "sets": [{"sets": "3", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثالث", "sets": [{"sets": "4", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الرابع", "sets": [{"sets": "4", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الخامس", "sets": [{"sets": "4", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع السادس", "sets": [{"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}]}]}], "phase2": [{"day": 1, "title": "اليوم الأول: سحب", "exercises": [{"num": "١", "name": "عقلة", "video": null}, {"num": "٢", "name": "تي-بار ضيق", "video": null}, {"num": "٣", "name": "سحب مسطرة", "video": null}, {"num": "٤", "name": "حبل أكتاف خلفي", "video": null}, {"num": "٥", "name": "جهاز أكتاف خلفي", "video": null}, {"num": "٦", "name": "بنش مرتفع بايسبس", "video": null}, {"num": "٧", "name": "جهاز باي ضيق", "video": null}], "weeks": [{"label": "الاسبوع السابع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثامن", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع التاسع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع العاشر", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الحادي عشر", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني عشر", "sets": [{"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}]}]}, {"day": 2, "title": "اليوم الثاني: دفع", "exercises": [{"num": "١", "name": "بار عالي", "video": null}, {"num": "٢", "name": "دامبل دفع", "video": null}, {"num": "٣", "name": "جهاز تجميع", "video": null}, {"num": "٤", "name": "دامبل تراي", "video": null}, {"num": "٥", "name": "كيبل مسطرة", "video": null}, {"num": "٦", "name": "جهاز أكتاف", "video": null}, {"num": "٧", "name": "دامبل أكتاف جانبي جالس", "video": null}], "weeks": [{"label": "الاسبوع السابع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثامن", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع التاسع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع العاشر", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الحادي عشر", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني عشر", "sets": [{"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}]}]}, {"day": 3, "title": "اليوم الثالث: جزء سفلي", "exercises": [{"num": "١", "name": "جهاز دفع", "video": null}, {"num": "٢", "name": "لنجز", "video": null}, {"num": "٣", "name": "دامبل ددلفت روم", "video": null}, {"num": "٤", "name": "رفرفة خلفي منسدح", "video": null}, {"num": "٥", "name": "بطات جالس", "video": null}, {"num": "٦", "name": "جهاز معده", "video": null}, {"num": "٧", "name": "بلانك", "video": null}], "weeks": [{"label": "الاسبوع السابع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "Failure", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثامن", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "Failure", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع التاسع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "Failure", "rest": "1:00-2:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع العاشر", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "Failure", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الحادي عشر", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "Failure", "rest": "1:00-2:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني عشر", "sets": [{"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "Failure", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}]}]}, {"day": 4, "title": "اليوم الرابع: جزء علوي", "exercises": [{"num": "١", "name": "جهاز مستوي جالس", "video": null}, {"num": "٢", "name": "دامبل تجميع", "video": null}, {"num": "٣", "name": "كيبل سحب واسع", "video": null}, {"num": "٤", "name": "كيبل بايسبس", "video": null}, {"num": "٥", "name": "جهاز تجديف واسع", "video": null}, {"num": "٦", "name": "جهاز أكتاف جانبي", "video": null}, {"num": "٧", "name": "دبس للتراي", "video": null}], "weeks": [{"label": "الاسبوع السابع", "sets": [{"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثامن", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع التاسع", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع العاشر", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الحادي عشر", "sets": [{"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني عشر", "sets": [{"sets": "3", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}]}]}, {"day": 5, "title": "اليوم الخامس: جزء سفلي", "exercises": [{"num": "١", "name": "جهاز هاك سكوات", "video": null}, {"num": "٢", "name": "رفرفة امامي", "video": null}, {"num": "٣", "name": "ددلفت ستف", "video": null}, {"num": "٤", "name": "رفرفة خلفي جالس", "video": null}, {"num": "٥", "name": "بطات واقف", "video": null}, {"num": "٦", "name": "بنش منخفض معده", "video": null}, {"num": "٧", "name": "دامبل مثلثات", "video": null}], "weeks": [{"label": "الاسبوع السابع", "sets": [{"sets": "3", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثامن", "sets": [{"sets": "4", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع التاسع", "sets": [{"sets": "4", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع العاشر", "sets": [{"sets": "4", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "3", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الحادي عشر", "sets": [{"sets": "4", "reps": "10-12", "rest": "1:00-3:00"}, {"sets": "3", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "7-10", "rest": "1:00-3:00"}, {"sets": "4", "reps": "12-15", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}, {"sets": "4", "reps": "10-12", "rest": "1:00-2:00"}]}, {"label": "الاسبوع الثاني عشر", "sets": [{"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "7-10", "rest": "0:30-1:00"}, {"sets": "2", "reps": "12-15", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}, {"sets": "2", "reps": "10-12", "rest": "0:30-1:00"}]}]}]};
const META = {"profile": {"subscription": "محسنات الأداء", "job": "مساعد مهندس", "tools": "نادي كامل", "experience": "أكثر من ٣ سنوات", "activity": "-", "goal": "زيادة الكتلة العضلية", "trainingDays": 5, "weight": 65, "height": 171, "age": 30, "weeklySteps": 70000, "weeklyCalories": 19950, "cardio": "العدد: 2   |   النوعية: غزالة أو درج شدة 7-10   |   المدة: 30 دقيقة", "dailySteps": 10000, "dailyCalories": "2800-2900", "fiber": "25-30g", "fat": "65-70g", "carbs": "399-403g", "protein": "155-160g", "coachName": "راشد الناجم", "clientName": "تركي فهد المطيري"}, "meals": [{"category": "وجبات منزلية", "items": [{"name": "Chicken Shawarma", "cal": 634.4, "protein": 65, "netCarb": 62.1, "fiber": 6.9, "fat": 14, "video": "https://youtu.be/EjDkyyPYVOc"}, {"name": "Meatballs with Rice", "cal": 479, "protein": 25.1, "netCarb": 55.5, "fiber": 7.1, "fat": 17.4, "video": "https://youtube.com/shorts/-Y0Fin_lJxU"}, {"name": "Burger With Mushroom", "cal": 559.7, "protein": 37.5, "netCarb": 59, "fiber": 2.1, "fat": 19.3, "video": "https://youtube.com/shorts/DBgiBj5iYrs"}]}, {"category": "وجبات McDonald's", "items": [{"name": "McChicken", "cal": 410, "protein": 17, "netCarb": 45, "fiber": 2, "fat": 18}]}, {"category": "وجبات Subway", "items": [{"name": "Flat bread (eggs and turkey) American cheese", "cal": 504, "protein": 30, "netCarb": 42, "fiber": 1, "fat": 24}]}, {"category": "سناكات", "items": [{"name": "1 Bannana 1tbsp Peanut butter 1 scoop Protein", "cal": 309, "protein": 30, "netCarb": 27, "fiber": 5, "fat": 9}]}]};


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

const EXERCISE_KEYS_BY_NAME = (() => {
  const map = {};
  [["phase1", 1], ["phase2", 2]].forEach(([progKey, ph]) => {
    PROGRAM[progKey].forEach((day, di) => {
      day.exercises.forEach((ex, ei) => {
        day.weeks.forEach((w, wi) => {
          (map[ex.name] ||= []).push(`p${ph}-w${wi}-d${di}-e${ei}`);
        });
      });
    });
  });
  return map;
})();

function getBestLoggedWeight(workoutLogs, exerciseName, excludeKey) {
  const keys = EXERCISE_KEYS_BY_NAME[exerciseName] || [];
  let best = null;
  for (const k of keys) {
    if (k === excludeKey) continue;
    const num = parseFloat(toEnNum(workoutLogs[k]?.weight));
    if (Number.isFinite(num) && (best === null || num > best)) best = num;
  }
  return best;
}

const ALL_EXERCISE_NAMES = [...new Set(PROGRAM.phase1.flatMap(day => day.exercises.map(ex => ex.name)))];

const DEFAULT_REST_SECONDS = 105;

function formatMMSS(totalSeconds) {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

function getWeekWorkoutStats(workoutLogs, globalWeek) {
  const phase = globalWeek <= 6 ? 1 : 2;
  const weekIdx = (globalWeek - 1) % 6;
  const days = phase === 1 ? PROGRAM.phase1 : PROGRAM.phase2;
  let done = 0, total = 0;
  days.forEach((day, di) => {
    day.exercises.forEach((ex, ei) => {
      total++;
      if (workoutLogs[`p${phase}-w${weekIdx}-d${di}-e${ei}`]?.done) done++;
    });
  });
  return { done, total };
}

const EXERCISE_OCCURRENCES_BY_NAME = (() => {
  const map = {};
  [["phase1", 1], ["phase2", 2]].forEach(([progKey, ph]) => {
    PROGRAM[progKey].forEach((day, di) => {
      day.exercises.forEach((ex, ei) => {
        day.weeks.forEach((w, wi) => {
          const globalWeek = ph === 1 ? wi + 1 : wi + 7;
          (map[ex.name] ||= []).push({ key: `p${ph}-w${wi}-d${di}-e${ei}`, globalWeek });
        });
      });
    });
  });
  return map;
})();

function getExerciseWeeklyHistory(workoutLogs, exerciseName) {
  const occ = EXERCISE_OCCURRENCES_BY_NAME[exerciseName] || [];
  return occ
    .map(o => ({ globalWeek: o.globalWeek, weight: workoutLogs[o.key]?.weight, reps: workoutLogs[o.key]?.reps }))
    .filter(o => o.weight || (o.reps && o.reps.some(r => r)))
    .sort((a, b) => a.globalWeek - b.globalWeek);
}

function buildProgressExportText(workoutLogs, followup, T) {
  const lines = [];
  lines.push(T(`تقرير تقدم — ${META.profile.clientName}`, `Progress report — ${META.profile.clientName}`));
  lines.push(T(`المدرب: ${META.profile.coachName} · الهدف: ${META.profile.goal}`, `Coach: ${META.profile.coachName} · Goal: ${META.profile.goal}`));
  lines.push("");

  lines.push(T("== المتابعة الأسبوعية (وزن الجسم / سعرات / بروتين / خطوات) ==", "== Weekly follow-up (body weight / calories / protein / steps) =="));
  let anyFollowup = false;
  for (let wk = 1; wk <= TOTAL_WEEKS; wk++) {
    const d = followup[wk];
    if (!d || !(d.weight || d.calories || d.protein || d.steps)) continue;
    anyFollowup = true;
    lines.push(`W${wk}: ${T("وزن", "weight")} ${d.weight || "-"}kg, ${T("سعرات", "cal")} ${d.calories || "-"}, ${T("بروتين", "protein")} ${d.protein || "-"}g, ${T("خطوات", "steps")} ${d.steps || "-"}`);
  }
  if (!anyFollowup) lines.push(T("لا يوجد تسجيل بعد.", "No entries yet."));
  lines.push("");

  lines.push(T("== تفاصيل التمرين لكل تمرين حسب الأسبوع (وزن kg × تكرارات) ==", "== Per-exercise weekly log (weight kg × reps) =="));
  let anyWorkout = false;
  ALL_EXERCISE_NAMES.forEach(name => {
    const hist = getExerciseWeeklyHistory(workoutLogs, name);
    if (!hist.length) return;
    anyWorkout = true;
    const label = T(name, EX_TR[name] || name);
    const parts = hist.map(h => {
      const reps = (h.reps || []).filter(r => r).join(",");
      return `W${h.globalWeek}: ${h.weight ? formatEnNumber(h.weight) + "kg" : "-"}${reps ? ` x[${reps}]` : ""}`;
    });
    lines.push(`${label}: ${parts.join(" | ")}`);
  });
  if (!anyWorkout) lines.push(T("لا يوجد تسجيل بعد.", "No entries yet."));
  lines.push("");

  lines.push(T("== أعلى وزن لكل تمرين ==", "== Best weight per exercise =="));
  ALL_EXERCISE_NAMES.forEach(name => {
    const best = getBestLoggedWeight(workoutLogs, name);
    if (best == null) return;
    lines.push(`${T(name, EX_TR[name] || name)}: ${formatEnNumber(best)}kg`);
  });

  return lines.join("\n");
}

const EX_TR = {"بار عالي":"High Bar Press","بطات جالس":"Seated Calf Raise","بطات واقف":"Standing Calf Raise","بلانك":"Plank","بنش مرتفع بايسبس":"Incline Bicep Bench","بنش منخفض معده":"Decline Bench Abs","تي-بار ضيق":"T-Bar Row (Close Grip)","جهاز أكتاف":"Shoulder Press Machine","جهاز أكتاف جانبي":"Lateral Raise Machine","جهاز أكتاف خلفي":"Rear Delt Machine","جهاز باي ضيق":"Close-Grip Bicep Machine","جهاز تجديف واسع":"Wide Row Machine","جهاز تجميع":"Pec Deck Fly","جهاز دفع":"Chest Press Machine","جهاز مستوي جالس":"Seated Row Machine","جهاز معده":"Ab Machine","جهاز هاك سكوات":"Hack Squat","حبل أكتاف خلفي":"Rope Rear Delt Pull","دامبل أكتاف جانبي جالس":"Seated DB Lateral Raise","دامبل تجميع":"Dumbbell Fly","دامبل تراي":"DB Tricep Extension","دامبل ددلفت روم":"DB Romanian Deadlift","دامبل دفع":"Dumbbell Press","دامبل مثلثات":"Dumbbell Shrugs","دبس للتراي":"Tricep Dips","ددلفت ستف":"Stiff-Leg Deadlift","رفرفة امامي":"Front Raise","رفرفة خلفي جالس":"Seated Rear Delt Fly","رفرفة خلفي منسدح":"Lying Rear Delt Fly","سحب مسطرة":"Straight Bar Pulldown","عقلة":"Pull-up","كيبل بايسبس":"Cable Bicep Curl","كيبل سحب واسع":"Wide Grip Pulldown","كيبل مسطرة":"Cable Tricep Pushdown","لنجز":"Lunges"};

function exerciseLabel(T, overrides, originalName) {
  // Exercise names always show Arabic, regardless of the AR/EN toggle.
  const arOverride = overrides[`exNameAr.${originalName}`];
  return arOverride !== undefined && arOverride !== "" ? arOverride : originalName;
}

const DAY_TR = {"اليوم الأول: سحب ( ظهر + باي + أكتاف خلفي )":"Day 1: Pull (Back, Biceps, Rear Delts)","اليوم الأول: سحب":"Day 1: Pull","اليوم الثاني:دفع ( صدر + تراي + أكتاف )":"Day 2: Push (Chest, Triceps, Shoulders)","اليوم الثاني: دفع":"Day 2: Push","اليوم الثالث: جزء سفلي ( رجلين + معده  )":"Day 3: Lower Body (Legs, Abs)","اليوم الثالث: جزء سفلي":"Day 3: Lower Body","اليوم الرابع: جزء علوي":"Day 4: Upper Body","اليوم الخامس: جزء سفلي ( رجلين + معده ومثلثات )":"Day 5: Lower Body (Legs, Abs, Traps)","اليوم الخامس: جزء سفلي":"Day 5: Lower Body"};

const MEAL_CAT_TR = {"وجبات منزلية":"Home Meals","وجبات McDonald's":"McDonald's","وجبات Subway":"Subway","سناكات":"Snacks"};

const TEMPO_NOTE = { ar: "نزول 3 ثواني · ثبات 1 ثانية تحت · صعود سريع", en: "3s down · 1s pause at bottom · fast up" };
const TEMPO_EXERCISES = new Set(["بار عالي", "دامبل دفع", "جهاز أكتاف", "جهاز دفع", "دامبل ددلفت روم", "جهاز هاك سكوات", "ددلفت ستف"]);

const COACH_INSTRUCTIONS_ALWAYS = [
  { ar: "سجّل الوزن المستخدم وعدد التكرارات المحققة بكل جولة — إلزامي كل أسبوع عشان نتابع تطورك أسبوع بأسبوع.", en: "Log the weight used and the reps you actually hit each set — mandatory every week so progress can be tracked." },
  { ar: "أي جولة تخلصها بسهولة ما تنحسب — لازم توصل قريب من الفشل العضلي بكل جولة.", en: "A set finished too easily doesn't count — push each set close to muscular failure." },
  { ar: "لا تزيد الوزن إلا إذا وصلت لأعلى حد من مدى التكرارات المطلوب بكل الجولات، وبعدها زِد بالأسبوع اللي بعده.", en: "Only increase the weight once you hit the top of the target rep range across all sets — then bump it up next week." },
  { ar: "خذ مدى حركي كامل بكل تمرين: أقصى تمديد للعضلة وأقصى انقباض.", en: "Use a full range of motion on every exercise: maximum stretch and maximum contraction." },
  { ar: "تقدر تبدّل تمرين معين، بس لازم تثبت عليه لبقية المرحلة، ولا تكرره بيوم ثاني.", en: "You can swap a specific exercise, but you must stick with it for the rest of the phase, and not repeat it on another day." },
];

function getCoachWeekTips(phase, localWeek) {
  if (localWeek === 1) {
    return phase === 1
      ? [{ ar: "الأسبوع الأول ممكن تحس إنه سهل، بس الصعوبة بتزيد تدريجياً لين توصل مرحلة ما تقدر تزيد ولا تكرار — اصبر وشد حيلك.", en: "Week 1 might feel easy, but the difficulty ramps up gradually until you can't add another rep — be patient and push through." }]
      : [{ ar: "أول أسبوع بعد الديلود بيكون سهل نسبياً، بس أصعب من أول أسبوعين بالمرحلة الأولى. راح تستخدم نفس وزن الأسبوع الخامس، بس حاول تكسر رقم تكراراتك هالمرة.", en: "The first week after the deload is easier, but harder than the phase's first two weeks. Use the same weight as week 5, but try to beat your rep numbers this time." }];
  }
  if (localWeek >= 2 && localWeek <= 4) {
    return [{ ar: "من هالأسبوع لين الخامس بيزيد حجم التمرين (عدد الجولات)، والتمارين نفسها تثبت لين نهاية المرحلة.", en: "From this week through week 5, training volume (number of sets) increases, while the exercises themselves stay fixed until the end of the phase." }];
  }
  if (localWeek === 5) {
    return [
      { ar: "من هالأسبوع لين الخامس بيزيد حجم التمرين (عدد الجولات)، والتمارين نفسها تثبت لين نهاية المرحلة.", en: "From this week through week 5, training volume (number of sets) increases, while the exercises themselves stay fixed until the end of the phase." },
      { ar: "هالأسبوع آخر أسبوع بناء قبل الديلود — زد الأوزان والتكرارات لأقصى مجهود تقدر عليه بدون ما تضحي بالتكنيك.", en: "This is the last build week before the deload — push weights and reps to your max effort without sacrificing technique." },
    ];
  }
  // localWeek === 6 (deload)
  return [{ ar: "أسبوع ديلود (راحة نشطة): خفف الوزن 10-30% عن أعلى وزن استخدمته بالمرحلة، أو خلّك على بعد 3-4 تكرارات من الفشل العضلي. الهدف تخفيف الحمل عن المفاصل والعضلات عشان ترجع تكسر أرقامك بعده. لو تحس بتعب زايد، خلّك على نفس أرقام الأسبوع اللي قبله.", en: "Deload week (active recovery): cut weight 10-30% from the heaviest you used this phase, or stay 3-4 reps short of failure. The goal is easing the load on joints and muscles so you can push your numbers again after. If you feel extra fatigued, just repeat last week's numbers." }];
}

const COLORS = {
  canvas: "#343434", bg: "#101012", surface: "#18191B", surface2: "#202124", surface3: "#28292D",
  line: "#34353A", text: "#F3F0E8", muted: "#A0A1A5", mutedDim: "#66686E",
  gold: "#D7AD2B", goldDim: "#8F7420", green: "#659675", rust: "#B86A50", blue: "#8B8D92",
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
  { key: "home", ar: "الرئيسية", en: "Home", icon: "⌂" },
  { key: "workout", ar: "التمرين", en: "Workout", icon: "▲" },
  { key: "followup", ar: "المتابعة", en: "Progress", icon: "◐" },
  { key: "menu", ar: "المنيو", en: "Menu", icon: "◈" },
];

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

function findResumePoint(workoutLogs) {
  for (const ph of [1, 2]) {
    const days = ph === 1 ? PROGRAM.phase1 : PROGRAM.phase2;
    for (let wi = 0; wi < 6; wi++) {
      for (let di = 0; di < days.length; di++) {
        const exercises = days[di].exercises;
        const allDone = exercises.length > 0 && exercises.every((_, i) => workoutLogs[`p${ph}-w${wi}-d${di}-e${i}`]?.done);
        if (!allDone) return { phase: ph, weekIdx: wi, dayIdx: di };
      }
    }
  }
  return { phase: 2, weekIdx: 5, dayIdx: PROGRAM.phase2.length - 1 };
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [loaded, setLoaded] = useState(false);
  const [workoutLogs, setWorkoutLogs] = useState({});
  const [followup, setFollowup] = useState(emptyFollowup());
  const [overrides, setOverrides] = useState({});
  const [lang, setLang] = useState("en");
  const [editMode, setEditMode] = useState(false);
  const [phase, setPhase] = useState(1);
  const [weekIdx, setWeekIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [mealCat, setMealCat] = useState(0);
  const [toast, setToast] = useState(null);
  const saveTimer = useRef(null);
  const firstLoad = useRef(true);

  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { setElapsed(0); }, [phase, weekIdx, dayIdx]);

  const T = useCallback((ar, en) => (lang === "ar" ? ar : en), [lang]);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          const savedWorkoutLogs = parsed.workoutLogs || {};
          if (parsed.workoutLogs) setWorkoutLogs(savedWorkoutLogs);
          if (parsed.followup) setFollowup({ ...emptyFollowup(), ...parsed.followup });
          const resume = findResumePoint(savedWorkoutLogs);
          setPhase(resume.phase);
          setWeekIdx(resume.weekIdx);
          setDayIdx(resume.dayIdx);
          if (parsed.overrides) setOverrides(parsed.overrides);
          if (parsed.lang) setLang(parsed.lang);
        }
      } catch (e) { /* nothing saved yet */ }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (firstLoad.current) { firstLoad.current = false; return; }
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify({ workoutLogs, followup, overrides, lang }), false);
        setToast(T("تم الحفظ", "Saved"));
        setTimeout(() => setToast(null), 1100);
      } catch (e) {
        setToast(T("تعذر الحفظ", "Save failed"));
        setTimeout(() => setToast(null), 1500);
      }
    }, 700);
    return () => clearTimeout(saveTimer.current);
  }, [workoutLogs, followup, overrides, lang, loaded]);

  const globalWeekNum = phase === 1 ? weekIdx + 1 : weekIdx + 7;

  const openTab = useCallback((nextTab) => {
    if (nextTab === "workout") {
      const resume = findResumePoint(workoutLogs);
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
            elapsed={elapsed} setElapsed={setElapsed}
          />
        )}
        {tab === "followup" && <FollowupTab followup={followup} setFollowup={setFollowup} workoutLogs={workoutLogs} overrides={overrides} T={T} />}
        {tab === "menu" && <MenuTab mealCat={mealCat} setMealCat={setMealCat} T={T} editMode={editMode} overrides={overrides} setOverride={setOverride} />}
      </ErrorBoundary>

      <nav style={{ position: "fixed", bottom: 0, left: "50%", width: "min(100%, 520px)", transform: "translateX(-50%)", background: "rgba(24,25,27,0.96)", backdropFilter: "blur(10px)", borderTop: `1px solid ${COLORS.line}`, display: "flex", padding: "8px 6px calc(8px + env(safe-area-inset-bottom))", zIndex: 40 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => openTab(t.key)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 2px", color: tab === t.key ? COLORS.gold : COLORS.mutedDim, transition: "color 160ms ease" }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>{t.icon}</span>
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
function WorkoutTab({ phase, setPhase, weekIdx, setWeekIdx, dayIdx, setDayIdx, workoutLogs, setExerciseLog, globalWeekNum, T, editMode, overrides, setOverride, elapsed, setElapsed }) {
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
  const nextName = nextEx ? exerciseLabel(T, overrides, nextEx.name) : null;
  const [showInstructions, setShowInstructions] = useState(false);
  const weekTips = getCoachWeekTips(phase, weekIdx + 1);
  const instructionItems = [...weekTips, ...COACH_INSTRUCTIONS_ALWAYS];

  const [restTimer, setRestTimer] = useState(null);
  useEffect(() => { setRestTimer(null); }, [phase, weekIdx, dayIdx]);
  useEffect(() => {
    if (!restTimer || restTimer.remaining <= 0) return;
    const id = setTimeout(() => setRestTimer(t => t && { ...t, remaining: t.remaining - 1 }), 1000);
    return () => clearTimeout(id);
  }, [restTimer]);
  useEffect(() => {
    if (restTimer && restTimer.remaining === 0) {
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      const t = setTimeout(() => setRestTimer(null), 4000);
      return () => clearTimeout(t);
    }
  }, [restTimer?.remaining]);
  const startRestTimer = (exName) => {
    const total = DEFAULT_REST_SECONDS;
    setRestTimer({ exName, remaining: total, total });
  };

  const [showNameList, setShowNameList] = useState(false);

  return (
    <div style={{ padding: "16px 16px 8px" }}>
      <SectionTitle
        eyebrow={`${T("المرحلة", "Phase")} ${phase === 1 ? T("الأولى", "1") : T("الثانية", "2")} · ${T("أسبوع", "Week")} ${globalWeekNum}`}
        title={<Ed id={dayTitleId} fallback={defaultTitle} editMode={editMode} overrides={overrides} setOverride={setOverride} style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 20 }} width="14em" />}
      />

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
        background: "rgba(201,162,39,0.1)", border: `1px solid ${COLORS.gold}`, borderRadius: 14,
        padding: "10px 16px", marginBottom: 14,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 13 }}>⏱</span>
          <span style={{ fontSize: 30, fontWeight: 900, color: COLORS.gold, fontFamily: "'Cairo', sans-serif", letterSpacing: 1, fontVariantNumeric: "tabular-nums" }}>
            {formatMMSS(elapsed)}
          </span>
          <span style={{ fontSize: 11, color: COLORS.mutedDim }}>{T("وقت التمرين", "workout time")}</span>
        </div>
        <button onClick={() => setElapsed(0)} style={{
          padding: "6px 12px", borderRadius: 10, border: `1px solid ${COLORS.gold}`, background: "transparent",
          color: COLORS.gold, fontSize: 12, fontWeight: 800, cursor: "pointer", flexShrink: 0,
        }}>↺ {T("تصفير", "Reset")}</button>
      </div>

      <div style={{ background: COLORS.surface, borderRadius: 12, border: `1px solid ${COLORS.line}`, marginBottom: 14, overflow: "hidden" }}>
        <button onClick={() => setShowInstructions(s => !s)} style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "none", border: "none", padding: "10px 14px", cursor: "pointer", color: COLORS.gold,
        }}>
          <span style={{ fontSize: 12.5, fontWeight: 800 }}>{`📋 تعليمات المدرب — الأسبوع ${globalWeekNum}`}</span>
          <span style={{ fontSize: 11, color: COLORS.mutedDim }}>{showInstructions ? T("إخفاء", "Hide") : T("عرض", "Show")}</span>
        </button>
        {showInstructions && (
          <ul style={{ margin: 0, padding: "0 14px 14px 28px", display: "flex", flexDirection: "column", gap: 8 }}>
            {instructionItems.map((item, i) => (
              <li key={i} style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.7 }}>{item.ar}</li>
            ))}
          </ul>
        )}
      </div>

      {editMode && (
        <div style={{ background: COLORS.surface, borderRadius: 12, border: `1px solid ${COLORS.line}`, marginBottom: 14, overflow: "hidden" }}>
          <button onClick={() => setShowNameList(s => !s)} style={{
            width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "none", border: "none", padding: "10px 14px", cursor: "pointer", color: COLORS.green,
          }}>
            <span style={{ fontSize: 12.5, fontWeight: 800 }}>{T("📝 أسماء التمارين (عربي/إنجليزي)", "📝 Exercise names (Arabic/English)")}</span>
            <span style={{ fontSize: 11, color: COLORS.mutedDim }}>{showNameList ? T("إخفاء", "Hide") : T("عرض", "Show")}</span>
          </button>
          {showNameList && (
            <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
              {ALL_EXERCISE_NAMES.map(name => (
                <div key={name} style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: 10, borderBottom: `1px solid ${COLORS.line}` }}>
                  <span style={{ fontSize: 10, color: COLORS.mutedDim }}>{name}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input
                      value={overrides[`exNameAr.${name}`] ?? name}
                      onChange={e => setOverride(`exNameAr.${name}`, e.target.value)}
                      placeholder={T("عربي", "Arabic")}
                      style={{ flex: 1, minWidth: 0, background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "6px 8px", color: COLORS.text, fontSize: 12, fontFamily: "inherit" }}
                    />
                    <input
                      value={overrides[`exNameEn.${name}`] ?? (EX_TR[name] || name)}
                      onChange={e => setOverride(`exNameEn.${name}`, e.target.value)}
                      placeholder={T("إنجليزي", "English")}
                      dir="ltr"
                      style={{ flex: 1, minWidth: 0, background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "6px 8px", color: COLORS.text, fontSize: 12, fontFamily: "inherit" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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

      {totalCount > 0 && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
          background: doneCount === totalCount ? "rgba(90,160,107,0.12)" : COLORS.surface,
          border: `1px solid ${doneCount === totalCount ? COLORS.green : COLORS.line}`,
          borderRadius: 12, padding: "10px 14px", marginBottom: 16,
        }}>
          {doneCount === totalCount ? (
            <span style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.green }}>✓ {T("خلصت كل تمارين اليوم!", "All exercises for today are done!")}</span>
          ) : (
            <>
              <span style={{ fontSize: 12, color: COLORS.muted }}>
                {T("التالي", "Next up")}: <span style={{ color: COLORS.text, fontWeight: 700 }}>{nextName}</span>
              </span>
              <span style={{ fontSize: 11, color: COLORS.mutedDim, flexShrink: 0 }}>{doneCount}/{totalCount}</span>
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
          const defaultName = exerciseLabel(T, overrides, ex.name);
          const setsId = `exSpec.${phase}.${weekIdx}.${dayIdx}.${i}.sets`;
          const repsId = `exSpec.${phase}.${weekIdx}.${dayIdx}.${i}.reps`;
          const restId = `exSpec.${phase}.${weekIdx}.${dayIdx}.${i}.rest`;
          const setsVal = overrides[setsId] ?? spec.sets;
          const repsVal = overrides[repsId] ?? (spec.reps || "");
          const restVal = overrides[restId] ?? (spec.rest || "");
          const numSets = parseInt(toEnNum(setsVal), 10) || 0;
          const bestWeight = getBestLoggedWeight(workoutLogs, ex.name, key);

          return (
            <div key={key} style={{ background: log.done ? "rgba(90,160,107,0.08)" : COLORS.surface, borderRadius: 16, padding: 14, border: `1px solid ${log.done ? COLORS.green : COLORS.line}`, transition: "all 0.2s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button
                    onClick={() => setExerciseLog(key, cur => ({ ...cur, done: !cur.done }))}
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
                      <span style={{ fontWeight: 700, fontSize: 15, textDecoration: log.done ? "line-through" : "none", opacity: log.done ? 0.7 : 1 }}>{defaultName}</span>
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
                      </div>
                    ) : (
                      <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 2 }}>
                        {setsVal} {T("جولات ×", "sets ×")} {repsVal || "—"} {T("تكرار · راحة", "reps · rest")} {restVal || "—"}
                      </div>
                    )}
                    {TEMPO_EXERCISES.has(ex.name) && (
                      <div style={{ fontSize: 10.5, color: COLORS.gold, marginTop: 3 }}>⏱ {TEMPO_NOTE.ar}</div>
                    )}
                  </div>
                </div>
                {ex.video && (
                  <a href={ex.video} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: COLORS.gold, border: `1px solid ${COLORS.goldDim}`, borderRadius: 8, padding: "4px 8px", textDecoration: "none", flexShrink: 0, fontWeight: 700 }}>▶ {T("فيديو", "Video")}</a>
                )}
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: COLORS.muted, flexShrink: 0 }}>{T("الوزن", "Weight")}</label>
                <input type="text" inputMode="decimal" placeholder="kg" value={log.weight}
                  onChange={e => setExerciseLog(key, cur => ({ ...cur, weight: toEnNum(e.target.value) }))}
                  style={{ width: 70, background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "6px 10px", color: COLORS.text, fontSize: 13, fontFamily: "inherit" }} />
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: 10.5, color: COLORS.mutedDim }}>{T("سجّل تكرارات كل جولة", "Log reps per set")}</span>
              </div>

              {bestWeight != null && (
                <div style={{ fontSize: 11.5, color: COLORS.gold, fontWeight: 700, marginTop: -4, marginBottom: 10 }}>
                  {T(`🏆 أعلى وزن وصلته لهذا التمرين: ${formatEnNumber(bestWeight)} كغ`, `🏆 Highest weight you've reached: ${formatEnNumber(bestWeight)} kg`)}
                </div>
              )}

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {Array.from({ length: numSets }).map((_, si) => (
                  <div key={si} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <input type="text" inputMode="numeric" placeholder="-" value={(log.reps && log.reps[si]) || ""}
                      onChange={e => {
                        const val = toEnNum(e.target.value);
                        setExerciseLog(key, cur => {
                          const reps = Array.from({ length: numSets }).map((_, k) => (cur.reps && cur.reps[k]) || "");
                          reps[si] = val;
                          const done = si === numSets - 1 ? !!val : cur.done;
                          return { ...cur, reps, done };
                        });
                        if (val) startRestTimer(defaultName);
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

      {restTimer && (
        <div style={{
          position: "fixed", bottom: 72, left: "50%", transform: "translateX(-50%)", width: "min(100%, 520px)",
          padding: "0 16px", zIndex: 45, boxSizing: "border-box",
        }}>
          <div style={{
            background: restTimer.remaining === 0 ? "rgba(90,160,107,0.95)" : "rgba(24,25,27,0.96)",
            backdropFilter: "blur(10px)", border: `1px solid ${restTimer.remaining === 0 ? COLORS.green : COLORS.gold}`,
            borderRadius: 14, padding: "10px 14px", boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: restTimer.remaining === 0 ? "#0d1a10" : COLORS.gold, flexShrink: 0 }}>
              {restTimer.remaining === 0 ? T("✓ خلصت الراحة", "✓ Rest done") : `⏳ ${formatMMSS(restTimer.remaining)}`}
            </span>
            <div style={{ flex: 1, height: 5, borderRadius: 4, background: COLORS.surface3, overflow: "hidden" }}>
              <div style={{
                width: `${((restTimer.total - restTimer.remaining) / restTimer.total) * 100}%`, height: "100%",
                background: restTimer.remaining === 0 ? "#0d1a10" : COLORS.gold, transition: "width 1s linear",
              }} />
            </div>
            <span style={{ fontSize: 11, color: restTimer.remaining === 0 ? "#0d1a10" : COLORS.muted, flexShrink: 0, maxWidth: "9em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {restTimer.exName}
            </span>
            <button onClick={() => setRestTimer(null)} style={{
              flexShrink: 0, width: 22, height: 22, borderRadius: "50%", border: "none", cursor: "pointer",
              background: "rgba(255,255,255,0.15)", color: restTimer.remaining === 0 ? "#0d1a10" : COLORS.text, fontSize: 12, lineHeight: 1,
            }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- FOLLOWUP ---------------- */
function FollowupTab({ followup, setFollowup, workoutLogs, overrides, T }) {
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

  const bestWeights = useMemo(
    () => ALL_EXERCISE_NAMES
      .map(name => ({ name, best: getBestLoggedWeight(workoutLogs, name) }))
      .filter(row => row.best != null),
    [workoutLogs]
  );

  const update = (week, field, value) => setFollowup(prev => ({ ...prev, [week]: { ...prev[week], [field]: value } }));

  const [exportText, setExportText] = useState(null);
  const [copied, setCopied] = useState(false);
  const generateExport = async () => {
    const text = buildProgressExportText(workoutLogs, followup, T);
    setExportText(text);
    setCopied(false);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { /* clipboard unavailable — text box below still lets you copy manually */ }
  };

  return (
    <div style={{ padding: "16px 16px 8px" }}>
      <SectionTitle eyebrow={T("سجل أسبوعي", "Weekly log")} title={T("المتابعة", "Progress")} />

      <SectionTitle title={T("ملخص التمرين", "Workout summary")} />
      <div style={{ background: COLORS.surface, borderRadius: 16, padding: 14, border: `1px solid ${COLORS.line}`, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 10, fontWeight: 700 }}>{T("إنجاز التمارين لكل أسبوع", "Exercises completed per week")}</div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: bestWeights.length ? 14 : 0 }}>
          {Array.from({ length: TOTAL_WEEKS }).map((_, i) => {
            const wk = i + 1;
            const { done, total } = getWeekWorkoutStats(workoutLogs, wk);
            const complete = total > 0 && done === total;
            return (
              <div key={wk} style={{
                flexShrink: 0, padding: "7px 10px", borderRadius: 12, textAlign: "center", minWidth: 46,
                border: `1px solid ${complete ? COLORS.green : (done > 0 ? COLORS.gold : COLORS.line)}`,
                background: complete ? "rgba(90,160,107,0.1)" : (done > 0 ? "rgba(201,162,39,0.1)" : "transparent"),
              }}>
                <div style={{ fontSize: 10, color: COLORS.mutedDim, fontWeight: 700 }}>{T("أ", "W")}{wk}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: complete ? COLORS.green : (done > 0 ? COLORS.gold : COLORS.mutedDim) }}>{done}/{total}</div>
              </div>
            );
          })}
        </div>

        {bestWeights.length > 0 && (
          <>
            <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8, fontWeight: 700 }}>{T("أعلى وزن لكل تمرين", "Best weight per exercise")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {bestWeights.map(row => (
                <div key={row.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 4px", borderBottom: `1px solid ${COLORS.line}` }}>
                  <span style={{ fontSize: 12.5, color: COLORS.text }}>{exerciseLabel(T, overrides, row.name)}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: COLORS.gold }}>{formatEnNumber(row.best)} {T("كغ", "kg")}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ background: COLORS.surface, borderRadius: 16, padding: 14, border: `1px solid ${COLORS.line}`, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4, fontWeight: 700 }}>{T("تصدير التقدم", "Export progress")}</div>
        <div style={{ fontSize: 11.5, color: COLORS.mutedDim, marginBottom: 10 }}>
          {T("جهّز تقرير نصي كامل بتقدمك وانسخه لترسله لأي ذكاء اصطناعي يحلل لك مدى تطورك.", "Build a full text report of your progress and send it to any AI to analyze it.")}
        </div>
        <button onClick={generateExport} style={{
          padding: "9px 16px", borderRadius: 10, border: `1px solid ${COLORS.gold}`, cursor: "pointer",
          background: copied ? "rgba(90,160,107,0.15)" : COLORS.gold, color: copied ? COLORS.green : "#1a1508",
          fontWeight: 800, fontSize: 12.5,
        }}>
          {copied ? T("✓ تم النسخ", "✓ Copied") : T("إنشاء ونسخ التقرير", "Generate & copy report")}
        </button>
        {exportText && (
          <textarea
            readOnly
            value={exportText}
            onFocus={e => e.target.select()}
            rows={8}
            dir="ltr"
            style={{
              width: "100%", marginTop: 10, background: COLORS.surface2, border: `1px solid ${COLORS.line}`,
              borderRadius: 10, padding: 10, color: COLORS.text, fontSize: 11, fontFamily: "monospace",
              resize: "vertical", lineHeight: 1.6,
            }}
          />
        )}
      </div>

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
function MenuTab({ mealCat, setMealCat, T, editMode, overrides, setOverride }) {
  const cat = META.meals[mealCat] || META.meals[0];
  const catNameId = `mealCat.${mealCat}`;
  const catDefault = T(cat.category, MEAL_CAT_TR[cat.category] || cat.category);

  return (
    <div style={{ padding: "16px 16px 8px" }}>
      <SectionTitle eyebrow={T("خيارات الوجبات", "Meal options")} title={T("منيو الأكل", "Food Menu")} />

      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 16 }}>
        {META.meals.map((m, ci) => {
          const id = `mealCat.${ci}`;
          const label = overrides[id] ?? T(m.category, MEAL_CAT_TR[m.category] || m.category);
          return (
            <button key={ci} onClick={() => setMealCat(ci)} style={{
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

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {cat.items.map((item, i) => {
          const base = `meal.${mealCat}.${i}`;
          const nameVal = overrides[`${base}.name`] ?? item.name;
          const fields = [
            ["cal", item.cal, T("سعرة", "kcal"), COLORS.gold, COLORS.surface3, 1.3],
            ["protein", item.protein, T("بروتين", "protein"), null, COLORS.surface2, 1],
            ["netCarb", item.netCarb, T("كارب صافي", "net carb"), null, COLORS.surface2, 1],
            ["fat", item.fat, T("دهون", "fat"), null, COLORS.surface2, 1],
            ["fiber", item.fiber, T("ألياف", "fiber"), null, COLORS.surface2, 1],
          ];
          return (
            <div key={i} style={{ background: COLORS.surface, borderRadius: 16, padding: 16, border: `1px solid ${COLORS.line}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <Ed id={`${base}.name`} fallback={nameVal} editMode={editMode} overrides={overrides} setOverride={setOverride} style={{ fontWeight: 700, fontSize: 14.5, flex: 1 }} width="16em" />
                {item.video && (
                  <a href={item.video} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: COLORS.gold, border: `1px solid ${COLORS.goldDim}`, borderRadius: 8, padding: "4px 8px", textDecoration: "none", flexShrink: 0, fontWeight: 700, marginRight: 8 }}>▶ {T("الطبخ", "Recipe")}</a>
                )}
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
