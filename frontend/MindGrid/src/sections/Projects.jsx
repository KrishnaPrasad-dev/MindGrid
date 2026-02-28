import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Projects fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="w-full flex flex-col relative overflow-hidden bg-black min-h-screen">
      {/* SAME HERO BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_2px,transparent_2px),linear-gradient(to_bottom,#80808005_2px,transparent_2px)] bg-[size:14px_24px]" />
        <div className="absolute left-1/2 top-[-10%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#ffffff15,#000000)]" />
      </div>

      <div className="relative z-10 w-[90%] max-w-6xl mx-auto mt-32 mb-20">
        {/* SAME HERO HEADING STYLE */}
        <h1
          className="text-4xl md:text-6xl font-extrabold text-center mb-16
        bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe]
        bg-[200%_auto] bg-clip-text text-transparent animate-text-gradient"
        >
          Projects
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-400">No projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white/5 border border-white/10 backdrop-blur-md
                p-8 rounded-2xl shadow-xl
                hover:scale-[1.03] transition duration-300
                flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-pink-400">
                    {project.title}
                  </h2>

                  <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full
                        bg-purple-500/20 text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress + Footer */}
                <div className="mt-8">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>{project.status}</span>
                    <span>{project.progress}%</span>
                  </div>

                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="mt-6 flex justify-between items-center text-sm">
                    <div className="flex flex-col text-sm">
                      <span className="text-gray-400">
                        By {project.createdBy?.name || "Unknown"}
                      </span>

                      {project.createdBy?.linkedin && (
                        <a
                          href={project.createdBy.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:underline text-xs"
                        >
                          Connect on LinkedIn
                        </a>
                      )}
                    </div>

                    <div className="flex gap-4">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-400 hover:underline"
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="mt-4 text-right">
                    <Link
                      to={`/edit-project/${project._id}`}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Edit →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
