# Laravel Backend Functional Core

This archive contains the functional core files for the Delight timetable backend:
- Models, Controllers, Services, Contracts, Repositories, Requests, Resources, Routes, Provider, Tests.

Drop these files into your existing Laravel project (app/ folder and routes/api.php) and register the RepositoryServiceProvider in `config/app.php` providers array.

Notes:
- SchedulerGrpcClient is a stub. Replace with generated PHP gRPC client or REST client to call the Python ML engine.
- Run `composer require laravel/sanctum` and set up Sanctum for auth.
- Run migrations to create required tables (migrations not included here).
