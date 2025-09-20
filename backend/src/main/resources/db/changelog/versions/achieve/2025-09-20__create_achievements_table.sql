create table achievements (
    achievement_id uuid primary key default gen_random_uuid(),
    user_id uuid references users(user_id) not null ,
    progress_bar int check ( progress_bar >= 0 and progress_bar <= 100 ) default 0,
    xp_count int check ( xp_count >= 0 ) default 0,
    my_corner bool default false, -- Заполнить все обязательные поля профиля.
    full_gear bool default false, -- Заполнить профиль на 100%.
    trailblazer bool default false, -- набрать 300 xp
    seasoned_user bool default false, -- набрать 700 xp
    connoisseur bool default false, -- набрать 1000 xp
    i_live_here bool default false, -- набрать 2000 xp
    platform_star bool default false -- набрать 3000 xp
);