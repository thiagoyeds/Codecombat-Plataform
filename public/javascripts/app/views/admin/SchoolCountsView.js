require.register("views/admin/SchoolCountsView", function(exports, require, module) {
var Classroom, CocoCollection, CourseInstance, RootView, SchoolCountsView, TrialRequest, User, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

CocoCollection = require('collections/CocoCollection');

Classroom = require('models/Classroom');

CourseInstance = require('models/CourseInstance');

TrialRequest = require('models/TrialRequest');

User = require('models/User');

utils = require('core/utils');

module.exports = SchoolCountsView = (function(superClass) {
  extend(SchoolCountsView, superClass);

  function SchoolCountsView() {
    return SchoolCountsView.__super__.constructor.apply(this, arguments);
  }

  SchoolCountsView.prototype.id = 'admin-school-counts-view';

  SchoolCountsView.prototype.template = require('templates/admin/school-counts');

  SchoolCountsView.prototype.initialize = function() {
    if (!me.isAdmin()) {
      return SchoolCountsView.__super__.initialize.call(this);
    }
    this.classrooms = new CocoCollection([], {
      url: "/db/classroom/-/users",
      model: Classroom
    });
    this.supermodel.loadCollection(this.classrooms, 'classrooms', {
      cache: false
    });
    this.courseInstances = new CocoCollection([], {
      url: "/db/course_instance/-/non-hoc",
      model: CourseInstance
    });
    this.supermodel.loadCollection(this.courseInstances, 'course-instances', {
      cache: false
    });
    this.students = new CocoCollection([], {
      url: "/db/user/-/students",
      model: User
    });
    this.supermodel.loadCollection(this.students, 'students', {
      cache: false
    });
    this.teachers = new CocoCollection([], {
      url: "/db/user/-/teachers",
      model: User
    });
    this.supermodel.loadCollection(this.teachers, 'teachers', {
      cache: false
    });
    this.trialRequests = new CocoCollection([], {
      url: "/db/trial.request/-/users",
      model: TrialRequest
    });
    this.supermodel.loadCollection(this.trialRequests, 'trial-requests', {
      cache: false
    });
    return SchoolCountsView.__super__.initialize.call(this);
  };

  SchoolCountsView.prototype.onLoaded = function() {
    var base, base1, base10, base11, base12, base13, base14, base2, base3, base4, base5, base6, base7, base8, base9, classroom, country, countryStateDistrictSchoolCountsMap, counts, courseInstance, district, districtData, districtSchoolCountsMap, graph, i, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, m, n, o, orphanStudentMap, orphanTeacherMap, p, props, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, school, schoolCountsMap, state, stateData, stateDistrictSchoolCountsMap, stateName, student, studentCount, studentID, studentId, studentMap, studentNonHocMap, teacher, teacherCount, teacherID, teacherMap, teacherStudentMap, totalStudents, totalTeachers, trialRequest, unknownSchoolCount, val;
    if (!me.isAdmin()) {
      return SchoolCountsView.__super__.onLoaded.call(this);
    }
    console.log(new Date().toISOString(), 'onLoaded');
    teacherMap = {};
    studentMap = {};
    studentNonHocMap = {};
    teacherStudentMap = {};
    unknownSchoolCount = 1;
    console.log(new Date().toISOString(), "Processing " + this.courseInstances.models.length + " course instances...");
    ref = this.courseInstances.models;
    for (i = 0, len = ref.length; i < len; i++) {
      courseInstance = ref[i];
      studentNonHocMap[courseInstance.get('ownerID')] = true;
      ref2 = (ref1 = courseInstance.get('members')) != null ? ref1 : [];
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        studentID = ref2[j];
        studentNonHocMap[studentID] = true;
      }
    }
    console.log(new Date().toISOString(), "Processing " + this.teachers.models.length + " teachers...");
    ref3 = this.teachers.models;
    for (k = 0, len2 = ref3.length; k < len2; k++) {
      teacher = ref3[k];
      teacherMap[teacher.id] = (ref4 = teacher.get('geo')) != null ? ref4 : {};
    }
    console.log(new Date().toISOString(), "Processing " + this.classrooms.models.length + " classrooms...");
    ref5 = this.classrooms.models;
    for (l = 0, len3 = ref5.length; l < len3; l++) {
      classroom = ref5[l];
      teacherID = classroom.get('ownerID');
      if (teacherMap[teacherID] == null) {
        teacherMap[teacherID] = {};
      }
      if (teacherStudentMap[teacherID] == null) {
        teacherStudentMap[teacherID] = {};
      }
      ref6 = classroom.get('members');
      for (m = 0, len4 = ref6.length; m < len4; m++) {
        studentID = ref6[m];
        if (teacherMap[studentID]) {
          continue;
        }
        if (!studentNonHocMap[studentID]) {
          continue;
        }
        studentMap[studentID] = {};
        teacherStudentMap[teacherID][studentID] = true;
      }
    }
    console.log(new Date().toISOString(), "Processing " + this.students.models.length + " students...");
    ref7 = this.students.models;
    for (n = 0, len5 = ref7.length; n < len5; n++) {
      student = ref7[n];
      if (!studentNonHocMap[student.id]) {
        continue;
      }
      if (teacherMap[student.id]) {
        continue;
      }
      studentMap[student.id] = {
        geo: student.get('geo')
      };
    }
    for (o = 0, len6 = studentNonHocMap.length; o < len6; o++) {
      studentId = studentNonHocMap[o];
      delete studentNonHocMap[studentId];
    }
    console.log(new Date().toISOString(), "Cloning " + (Object.keys(teacherMap).length) + " teacherMap...");
    orphanTeacherMap = {};
    for (teacherID in teacherMap) {
      orphanTeacherMap[teacherID] = true;
    }
    console.log(new Date().toISOString(), "Cloning " + (Object.keys(studentMap).length) + " studentMap...");
    orphanStudentMap = {};
    for (studentID in studentMap) {
      orphanStudentMap[studentID] = true;
    }
    console.log(new Date().toISOString(), "Processing " + this.trialRequests.models.length + " trial requests...");
    countryStateDistrictSchoolCountsMap = {};
    ref8 = this.trialRequests.models;
    for (p = 0, len7 = ref8.length; p < len7; p++) {
      trialRequest = ref8[p];
      teacherID = trialRequest.get('applicant');
      if (!teacherMap[teacherID]) {
        continue;
      }
      props = trialRequest.get('properties');
      if (props.nces_id && props.country && props.state) {
        country = props.country;
        state = props.state;
        district = props.nces_district;
        school = props.nces_name;
        if (countryStateDistrictSchoolCountsMap[country] == null) {
          countryStateDistrictSchoolCountsMap[country] = {};
        }
        if ((base = countryStateDistrictSchoolCountsMap[country])[state] == null) {
          base[state] = {};
        }
        if ((base1 = countryStateDistrictSchoolCountsMap[country][state])[district] == null) {
          base1[district] = {};
        }
        if ((base2 = countryStateDistrictSchoolCountsMap[country][state][district])[school] == null) {
          base2[school] = {
            students: {},
            teachers: {}
          };
        }
        countryStateDistrictSchoolCountsMap[country][state][district][school].teachers[teacherID] = true;
        ref9 = teacherStudentMap[teacherID];
        for (studentID in ref9) {
          val = ref9[studentID];
          if (!orphanStudentMap[studentID]) {
            continue;
          }
          countryStateDistrictSchoolCountsMap[country][state][district][school].students[studentID] = true;
          delete orphanStudentMap[studentID];
        }
        delete orphanTeacherMap[teacherID];
      } else if (!_.isEmpty(props.country)) {
        country = (ref10 = props.country) != null ? ref10.trim() : void 0;
        country = country[0].toUpperCase() + country.substring(1).toLowerCase();
        if (/台灣/ig.test(country)) {
          country = 'Taiwan';
        }
        if (/^uk$|united kingdom|england/ig.test(country)) {
          country = 'UK';
        }
        if (/^u\.s\.?(\.a)?\.?$|^us$|america|united states|usa/ig.test(country)) {
          country = 'USA';
        }
        state = (ref11 = props.state) != null ? ref11 : 'unknown';
        if (country === 'USA') {
          stateName = utils.usStateCodes.sanitizeStateName(state);
          if (stateName) {
            state = utils.usStateCodes.getStateCodeByStateName(stateName);
          }
          state = (ref12 = utils.usStateCodes.sanitizeStateCode(state)) != null ? ref12 : state;
        }
        district = 'unknown';
        school = (ref13 = props.organiziation) != null ? ref13 : 'unknown';
        if (countryStateDistrictSchoolCountsMap[country] == null) {
          countryStateDistrictSchoolCountsMap[country] = {};
        }
        if ((base3 = countryStateDistrictSchoolCountsMap[country])[state] == null) {
          base3[state] = {};
        }
        if ((base4 = countryStateDistrictSchoolCountsMap[country][state])[district] == null) {
          base4[district] = {};
        }
        if ((base5 = countryStateDistrictSchoolCountsMap[country][state][district])[school] == null) {
          base5[school] = {
            students: {},
            teachers: {}
          };
        }
        countryStateDistrictSchoolCountsMap[country][state][district][school].teachers[teacherID] = true;
        ref14 = teacherStudentMap[teacherID];
        for (studentID in ref14) {
          val = ref14[studentID];
          if (!orphanStudentMap[studentID]) {
            continue;
          }
          countryStateDistrictSchoolCountsMap[country][state][district][school].students[studentID] = true;
          delete orphanStudentMap[studentID];
        }
        delete orphanTeacherMap[teacherID];
      }
    }
    console.log(new Date().toISOString(), "Processing " + (Object.keys(orphanTeacherMap).length) + " orphaned teachers with geo IPs...");
    for (teacherID in orphanTeacherMap) {
      val = orphanTeacherMap[teacherID];
      if (!teacherMap[teacherID].country) {
        continue;
      }
      country = teacherMap[teacherID].countryName || teacherMap[teacherID].country;
      if (country === 'GB' || country === 'United Kingdom') {
        country = 'UK';
      }
      if (country === 'US' || country === 'United States') {
        country = 'USA';
      }
      state = teacherMap[teacherID].region || 'unknown';
      district = 'unknown';
      school = 'unknown';
      if (teacherStudentMap[teacherID] && Object.keys(teacherStudentMap[teacherID]).length >= 10) {
        school += unknownSchoolCount++;
      }
      if (countryStateDistrictSchoolCountsMap[country] == null) {
        countryStateDistrictSchoolCountsMap[country] = {};
      }
      if ((base6 = countryStateDistrictSchoolCountsMap[country])[state] == null) {
        base6[state] = {};
      }
      if ((base7 = countryStateDistrictSchoolCountsMap[country][state])[district] == null) {
        base7[district] = {};
      }
      if ((base8 = countryStateDistrictSchoolCountsMap[country][state][district])[school] == null) {
        base8[school] = {
          students: {},
          teachers: {}
        };
      }
      countryStateDistrictSchoolCountsMap[country][state][district][school].teachers[teacherID] = true;
      if (teacherStudentMap[teacherID] && Object.keys(teacherStudentMap[teacherID]).length >= 10) {
        ref15 = teacherStudentMap[teacherID];
        for (studentID in ref15) {
          val = ref15[studentID];
          if (!orphanStudentMap[studentID]) {
            continue;
          }
          countryStateDistrictSchoolCountsMap[country][state][district][school].students[studentID] = true;
          delete orphanStudentMap[studentID];
        }
      }
      delete orphanTeacherMap[teacherID];
    }
    console.log(new Date().toISOString(), "Processing " + (Object.keys(orphanTeacherMap).length) + " orphaned teachers with 10+ students...");
    for (teacherID in orphanTeacherMap) {
      val = orphanTeacherMap[teacherID];
      if (!(teacherStudentMap[teacherID] && Object.keys(teacherStudentMap[teacherID]).length >= 10)) {
        continue;
      }
      country = 'unknown';
      state = 'unknown';
      district = 'unknown';
      school = "unknown" + (unknownSchoolCount++);
      if (countryStateDistrictSchoolCountsMap[country] == null) {
        countryStateDistrictSchoolCountsMap[country] = {};
      }
      if ((base9 = countryStateDistrictSchoolCountsMap[country])[state] == null) {
        base9[state] = {};
      }
      if ((base10 = countryStateDistrictSchoolCountsMap[country][state])[district] == null) {
        base10[district] = {};
      }
      if ((base11 = countryStateDistrictSchoolCountsMap[country][state][district])[school] == null) {
        base11[school] = {
          students: {},
          teachers: {}
        };
      }
      countryStateDistrictSchoolCountsMap[country][state][district][school].teachers[teacherID] = true;
      ref16 = teacherStudentMap[teacherID];
      for (studentID in ref16) {
        val = ref16[studentID];
        if (!orphanStudentMap[studentID]) {
          continue;
        }
        countryStateDistrictSchoolCountsMap[country][state][district][school].students[studentID] = true;
        delete orphanStudentMap[studentID];
      }
      delete orphanTeacherMap[teacherID];
    }
    console.log(new Date().toISOString(), "Processing " + (Object.keys(orphanStudentMap).length) + " orphaned students with geo IPs...");
    for (studentID in orphanStudentMap) {
      if (!((ref17 = studentMap[studentID].geo) != null ? ref17.country : void 0)) {
        continue;
      }
      country = studentMap[studentID].geo.countryName || studentMap[studentID].geo.country;
      if (country === 'GB' || country === 'United Kingdom') {
        country = 'UK';
      }
      if (country === 'US' || country === 'United States') {
        country = 'USA';
      }
      state = studentMap[studentID].geo.region || 'unknown';
      district = 'unknown';
      school = 'unknown';
      if (countryStateDistrictSchoolCountsMap[country] == null) {
        countryStateDistrictSchoolCountsMap[country] = {};
      }
      if ((base12 = countryStateDistrictSchoolCountsMap[country])[state] == null) {
        base12[state] = {};
      }
      if ((base13 = countryStateDistrictSchoolCountsMap[country][state])[district] == null) {
        base13[district] = {};
      }
      if ((base14 = countryStateDistrictSchoolCountsMap[country][state][district])[school] == null) {
        base14[school] = {
          students: {},
          teachers: {}
        };
      }
      countryStateDistrictSchoolCountsMap[country][state][district][school].students[studentID] = true;
      delete orphanStudentMap[studentID];
    }
    console.log(new Date().toISOString(), 'Building country graphs...');
    this.countryGraphs = {};
    this.countryCounts = [];
    totalStudents = 0;
    totalTeachers = 0;
    for (country in countryStateDistrictSchoolCountsMap) {
      stateDistrictSchoolCountsMap = countryStateDistrictSchoolCountsMap[country];
      this.countryGraphs[country] = {
        districtCounts: [],
        stateCounts: [],
        stateCountsMap: {},
        totalSchools: 0,
        totalStates: 0,
        totalStudents: 0,
        totalTeachers: 0
      };
      for (state in stateDistrictSchoolCountsMap) {
        districtSchoolCountsMap = stateDistrictSchoolCountsMap[state];
        if ((utils.usStateCodes.sanitizeStateCode(state) != null) || ['GU', 'PR'].indexOf(state) >= 0) {
          this.countryGraphs[country].totalStates++;
        }
        stateData = {
          state: state,
          districts: 0,
          schools: 0,
          students: 0,
          teachers: 0
        };
        for (district in districtSchoolCountsMap) {
          schoolCountsMap = districtSchoolCountsMap[district];
          stateData.districts++;
          districtData = {
            state: state,
            district: district,
            schools: 0,
            students: 0,
            teachers: 0
          };
          for (school in schoolCountsMap) {
            counts = schoolCountsMap[school];
            studentCount = Object.keys(counts.students).length;
            teacherCount = Object.keys(counts.teachers).length;
            this.countryGraphs[country].totalSchools++;
            this.countryGraphs[country].totalStudents += studentCount;
            this.countryGraphs[country].totalTeachers += teacherCount;
            stateData.schools++;
            stateData.students += studentCount;
            stateData.teachers += teacherCount;
            districtData.schools++;
            districtData.students += studentCount;
            districtData.teachers += teacherCount;
          }
          this.countryGraphs[country].districtCounts.push(districtData);
        }
        this.countryGraphs[country].stateCounts.push(stateData);
        this.countryGraphs[country].stateCountsMap[state] = stateData;
      }
      this.countryCounts.push({
        country: country,
        schools: this.countryGraphs[country].totalSchools,
        students: this.countryGraphs[country].totalStudents,
        teachers: this.countryGraphs[country].totalTeachers
      });
      totalStudents += this.countryGraphs[country].totalStudents;
      totalTeachers += this.countryGraphs[country].totalTeachers;
    }
    this.untriagedStudents = Object.keys(studentMap).length - totalStudents;
    this.untriagedTeachers = Object.keys(teacherMap).length - totalTeachers;
    console.log(new Date().toISOString(), "teacherMap " + (Object.keys(teacherMap).length) + " totalTeachers " + totalTeachers + " orphanTeacherMap " + (Object.keys(orphanTeacherMap).length) + "  @untriagedTeachers " + this.untriagedTeachers);
    console.log(new Date().toISOString(), "studentMap " + (Object.keys(studentMap).length) + " totalStudents " + totalStudents + " orphanStudentMap " + (Object.keys(orphanStudentMap).length) + "  @untriagedStudents " + this.untriagedStudents);
    ref18 = this.countryGraphs;
    for (country in ref18) {
      graph = ref18[country];
      graph.stateCounts.sort(function(a, b) {
        return b.students - a.students || b.teachers - a.teachers || b.schools - a.schools || b.districts - a.districts || b.state.localeCompare(a.state);
      });
      graph.districtCounts.sort(function(a, b) {
        var stateCountsA, stateCountsB;
        if (a.state !== b.state) {
          stateCountsA = graph.stateCountsMap[a.state];
          stateCountsB = graph.stateCountsMap[b.state];
          return stateCountsB.students - stateCountsA.students || stateCountsB.teachers - stateCountsA.teachers || stateCountsB.schools - stateCountsA.schools || stateCountsB.districts - stateCountsA.districts || a.state.localeCompare(b.state);
        } else {
          return b.students - a.students || b.teachers - a.teachers || b.schools - a.schools || b.district.localeCompare(a.district);
        }
      });
    }
    this.countryCounts.sort(function(a, b) {
      return b.students - a.students || b.teachers - a.teachers || b.schools - a.schools || b.country.localeCompare(a.country);
    });
    console.log(new Date().toISOString(), 'Done...');
    return SchoolCountsView.__super__.onLoaded.call(this);
  };

  return SchoolCountsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/SchoolCountsView.js.map