import { createContext,useEffect,useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizationDuration from 'humanize-duration'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchAllCourses = async () => {
     setAllCourses(dummyCourses);
  };

  // const calculateRating = (course) => {
  //   console.log(course.courseRatings);
  //  if(course.courseRatings.length === 0) return 0;
  //  let totalRating = 0;
  //  course.courseRatings.forEach((rating) => {
  //     totalRating += rating.rating;
  //   });
  //   return (totalRating / course.courseRatings.length);
  // }

  // const calculateRating = ({ courseRatings = [] }) =>
  //   courseRatings.length
  //     ? +(courseRatings.reduce((sum, { rating }) => sum + rating, 0) / courseRatings.length).toFixed(1)
  //     : 0;

  const calculateRating = (course) => {
    const ratings = course?.courseRatings ?? []; // default to []
    if (ratings.length === 0) return 0;
    
    const total = ratings.reduce((sum, r) => sum + (r?.rating ?? 0), 0);
    return +(total / ratings.length).toFixed(1);
  };

  // calculate chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration);
    return humanizationDuration(time * 60 * 1000, { units: ['h', 'm'] });
  }
  
  //function to calculate course duration

  const calculateCourseDuration = (course) => {
    let time = 0

    course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) =>time+= lecture.lectureDuration ));
    return humanizationDuration(time * 60 * 1000, { units: ['h', 'm'] });
  }

  //function calculate the number of lectures in a course
  const calculateNoOfLectures = (course) => {
    let noOfLectures = 0;
    course.courseContent.forEach((chapter) => {
      if(Array.isArray(chapter.chapterContent)) {
        noOfLectures += chapter.chapterContent.length;
      }
    });
    return noOfLectures;
  }

  //fetch user enrolled courses
  const fetchEnrolledCourses = async () => {
    // Simulating fetching enrolled courses
    setEnrolledCourses(dummyCourses);
  };


  useEffect(() => {
    fetchAllCourses();
    fetchEnrolledCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchEnrolledCourses
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
