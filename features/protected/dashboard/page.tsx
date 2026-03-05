'use client';
import {
  FaBriefcase,
  FaBullhorn,
  FaChartLine,
  FaClock,
  FaCommentDots,
  FaHouseChimney,
  FaUserPlus,
} from 'react-icons/fa6';
import { IoIosSettings } from 'react-icons/io';
import { BiSolidLike } from 'react-icons/bi';
import { BsFire } from 'react-icons/bs';
import { FcAlarmClock } from 'react-icons/fc';
import { TbReport } from 'react-icons/tb';

interface ActivityProps {
  icon: React.ReactNode;
  title: string;
  time: string;
}

function ActivityItem({ icon, time, title }: ActivityProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-md border text-gray-700">
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-yellow-500">{time}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen w-full">
      <div className="bg-gray-200 h-17 flex justify-between">
        <div className="text-xl text-black items-center gap-1 flex mx-2">
          <FaHouseChimney />
          <h2>Overview</h2>
        </div>
        <div className="flex gap-5">
          <div className="text-xl text-black items-center gap-1 flex">
            <IoIosSettings />
            <h2>System Status:</h2>
            <p className="shadow-2xl bg-gray-400 py-2 px-4 text-md font-light">Bridge API:On</p>
          </div>
          <div className="text-xl text-black items-center gap-1 flex">
            <FaClock />
            <h2>Last sync:</h2>
            <p className="shadow-2xl bg-gray-400 py-2 px-4 text-md font-light">09:00 AM</p>
          </div>
        </div>
      </div>

      <div className="w-full px-6 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          <div className="w-64 h-44 bg-[#142B42] rounded-xl flex flex-col items-center justify-between p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <FaBriefcase className="w-8 h-8" />
            <h2 className="text-base font-semibold text-center tracking-wide">
              Total Active Blinks
            </h2>
            <div className="w-full bg-[#F2B62B] text-[#142B42] font-bold text-lg text-center py-2 rounded-lg">
              1,234
            </div>
          </div>

          <div className="w-64 h-44 bg-[#142B42] rounded-xl flex flex-col items-center justify-between p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <BiSolidLike className="w-8 h-8" />
            <h2 className="text-base font-semibold text-center tracking-wide">
              Total Active Blinks
            </h2>
            <div className="w-full bg-[#F2B62B] text-[#142B42] font-bold text-lg text-center py-2 rounded-lg">
              56
            </div>
          </div>

          <div className="w-64 h-44 bg-[#142B42] rounded-xl flex flex-col items-center justify-between p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <BsFire className="w-8 h-8" />
            <h2 className="text-base font-semibold text-center tracking-wide">Trending Topics</h2>
            <div className="w-full bg-[#F2B62B] text-[#142B42] font-bold text-lg text-center py-2 rounded-lg">
              12
            </div>
          </div>

          <div className="w-64 h-44 bg-[#142B42] rounded-xl flex flex-col items-center justify-between p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <FcAlarmClock className="w-8 h-8" />
            <h2 className="text-base font-semibold text-center tracking-wide">Avg. Time</h2>
            <div className="w-full bg-[#F2B62B] text-[#142B42] font-bold text-lg text-center py-2 rounded-lg">
              30 Min
            </div>
          </div>

          <div className="w-64 h-44 bg-[#142B42] rounded-xl flex flex-col items-center justify-between p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <TbReport className="w-8 h-8" />
            <h2 className="text-base font-semibold text-center tracking-wide">Pending Reports</h2>
            <div className="w-full bg-[#F2B62B] text-[#142B42] font-bold text-lg text-center py-2 rounded-lg">
              12
            </div>
          </div>
        </div>
      </div>
      {/* Quick stats & Recent Activity */}
      <div className="w-full mt-8 px-6 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'New', value: '25' },
              { label: 'Content Uploads', value: '1,500' },
              { label: 'Average Session Duration', value: '10' },
              { label: 'Bounce Rate', value: '35' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg border shadow-sm p-4">
                <p className="text-sm text-gray-500 font-semibold">{item.label}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>

                <div className="mt-3 h-8 from-yellow-300 to-yellow-100 rounded opacity-70" />
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Key performance indicators at a glance for immediate understanding of system health.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <div className="bg-white rounded-lg border shadow-sm p-4 space-y-4">
            <ActivityItem
              icon={<FaUserPlus />}
              title="New user John Doe registered"
              time="2 minutes ago"
            />

            <ActivityItem
              icon={<FaBullhorn />}
              title="Marketing Campaign Blink updated"
              time="1 hour ago"
            />

            <ActivityItem
              icon={<FaCommentDots />}
              title="New comment on Product Feedback"
              time="3 hours ago"
            />

            <ActivityItem
              icon={<FaChartLine />}
              title="Analytics report generated for Q3 Performance"
              time="Yesterday"
            />
          </div>
        </div>
      </div>
      {/* Heatmap */}
      <div className="w-full mt-6 px-6">
        <h2 className="text-xl font-semibold mb-4">Heatmap</h2>

        <div className="overflow-x-auto">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 text-sm text-gray-600 mt-6">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="h-5 flex items-center">
                  {day}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              {Array.from({ length: 52 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, rowIdx) => {
                    const random = Math.floor(Math.random() * 4); // 0–3 intensity
                    const colors = ['bg-gray-100', 'bg-[#142B42]', 'bg-[#F2B62B]', 'bg-[#0f2236]'];

                    return (
                      <div key={rowIdx} className={`w-5 h-5 rounded-sm border ${colors[random]}`} />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-2 ml-14 pr-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
            (month) => (
              <span key={month}>{month}</span>
            ),
          )}
        </div>

        <div className="mt-6 bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industrys standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged.
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
