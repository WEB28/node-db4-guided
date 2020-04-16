
exports.up = function(knex) {
    return knex.schema.createTable('tracks', tbl => {
        tbl.string('id', 255)
            .primary();

        tbl.string('name', 255)
            .notNullable()
            .unique();
    })
    .createTable('units', tbl => {
        tbl.string('id', 255)
            .primary();

        tbl.string('name', 255)
            .notNullable()
            .index();

        // foreign key exmaple
        // data type MUST be the same as the primary key on the other table
        tbl.string('track_id', 255)
            .notNullable()
            .references('id')
            .inTable('tracks')
            .onDelete('RESTRICT') // 'CASCADE', 'RESTRICT, 'SET NULL', 'DO NOTHING'
            .onUpdate('CASCADE');
    })
    .createTable('sprints', tbl => {
        tbl.string('id', 255)
            .primary();

        tbl.string('name', 255)
            .notNullable()
            .index();

        // foreign key exmaple
        // data type MUST be the same as the primary key on the other table
        tbl.string('unit_id', 255)
            .notNullable()
            .references('id')
            .inTable('units');
    })
    .createTable('students', tbl => {
        tbl.string('id', 255).primary();

        tbl.string('name', 255).notNullable().index();
    })
    .createTable('cohorts', tbl => {
        tbl.string('id', 255)
            .primary();

        tbl.string('name', 255)
            .notNullable()
            .index();
    })
    .createTable('student_cohorts', tbl => {
        tbl.string('id', 255)
            .primary();

        tbl.date('joined_on');
        tbl.date('left_on');

        tbl.string('student_id', 255)
            .notNullable()
            .references('id')
            .inTable('students');
        tbl.string('cohort_id', 255)
            .notNullable()
            .references('id')
            .inTable('cohorts');
        
        tbl.unique(['student_id', 'cohort_id']);
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('student_cohorts')
        .dropTableIfExists('cohorts')
        .dropTableIfExists('students')
        .dropTableIfExists('sprints')
        .dropTableIfExists('units')
        .dropTableIfExists('tracks')
};
