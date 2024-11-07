using BAExamApp.Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace BAExamApp.DataAccess.EFCore.Repositories;


public class StudentClassroomRepository : EFBaseRepository<StudentClassroom>, IStudentClassroomRepository
{
    public StudentClassroomRepository(BAExamAppDbContext context) : base(context)
    {
    }

    public async Task<List<StudentClassroom>> GetActiveStudentsByClassroomIdAsync(Guid classroomId)
    {
        return await _table.Where(sc => sc.ClassroomId == classroomId && sc.Status != Status.Deleted).ToListAsync(); //Sınıftaki aktif öğrencileri getirir.
    }
    public int CountActiveStudentClassrooms()
    {
        return _table.Count(sc => sc.Status != Status.Deleted);
    }
}
