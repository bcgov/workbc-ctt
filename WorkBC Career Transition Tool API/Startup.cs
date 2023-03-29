using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using TransferrableSkillsToolAPI.DbContexts;

namespace TransferrableSkillsToolAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            if (Convert.ToBoolean(Configuration["UseSQL"]))
            {
                var connectionString = Configuration.GetConnectionString("Database");

                services.AddDbContext<SalaryContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<EducationLevelContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<SimilarityContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<WorkExperienceContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<OccupationListItemContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<OccupationContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<OccupationMatchContext>(op => op.UseSqlServer(connectionString));
            }
            else 
            {
                services.AddDbContext<SalaryContext>(opt => opt.UseInMemoryDatabase("TodoList"));
                services.AddDbContext<EducationLevelContext>(opt => opt.UseInMemoryDatabase("TodoList"));
                services.AddDbContext<SimilarityContext>(opt => opt.UseInMemoryDatabase("TodoList"));
                services.AddDbContext<WorkExperienceContext>(opt => opt.UseInMemoryDatabase("TodoList"));
                services.AddDbContext<OccupationListItemContext>(opt => opt.UseInMemoryDatabase("TodoList"));
                services.AddDbContext<OccupationContext>(opt => opt.UseInMemoryDatabase("TodoList"));
                services.AddDbContext<OccupationMatchContext>(opt => opt.UseInMemoryDatabase("TodoList"));
            }

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins(Configuration["CORSOrigins"]);
                    });
            });

            services.AddControllers();

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Transferrable Skills Tool API V.1.0.0.4");
                c.RoutePrefix = string.Empty;
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
             
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
